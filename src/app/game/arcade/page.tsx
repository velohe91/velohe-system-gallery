"use client";

import { useEffect, useRef, useState } from "react";

type GameState = "start" | "playing" | "complete" | "gameover";

type PlayerState = {
  x: number;
  y: number;
  velocityY: number;
  facing: "left" | "right";
  attacking: boolean;
  onGround: boolean;
};

type Platform = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type Neobyte = {
  id: number;
  x: number;
  y: number;
  collected: boolean;
};

type Obstacle = {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

type Enemy = {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  alive: boolean;
};

const WORLD_WIDTH = 3200;
const WORLD_HEIGHT = 560;

const FLOOR_Y = 470;

const PLAYER_WIDTH = 48;
const PLAYER_HEIGHT = 72;

const ENEMY_WIDTH = 42;
const ENEMY_HEIGHT = 58;

const MOVE_SPEED = 5;
const JUMP_FORCE = -13;
const GRAVITY = 0.65;

const INITIAL_HP = 3;

const INITIAL_PLAYER: PlayerState = {
  x: 180,
  y: FLOOR_Y - PLAYER_HEIGHT,
  velocityY: 0,
  facing: "right",
  attacking: false,
  onGround: true,
};

const PLATFORMS: Platform[] = [
  {
    x: 430,
    y: 390,
    width: 180,
    height: 16,
  },
  {
    x: 700,
    y: 350,
    width: 180,
    height: 16,
  },
  {
    x: 980,
    y: 395,
    width: 200,
    height: 16,
  },
  {
    x: 1280,
    y: 345,
    width: 200,
    height: 16,
  },
  {
    x: 1580,
    y: 390,
    width: 220,
    height: 16,
  },
  {
    x: 1900,
    y: 340,
    width: 220,
    height: 16,
  },
  {
    x: 2200,
    y: 390,
    width: 220,
    height: 16,
  },
  {
    x: 2500,
    y: 350,
    width: 220,
    height: 16,
  },
];

const INITIAL_NEOBYTES: Neobyte[] = [
  {
    id: 1,
    x: 350,
    y: 430,
    collected: false,
  },
  {
    id: 2,
    x: 510,
    y: 350,
    collected: false,
  },
  {
    id: 3,
    x: 770,
    y: 310,
    collected: false,
  },
  {
    id: 4,
    x: 1040,
    y: 355,
    collected: false,
  },
  {
    id: 5,
    x: 1340,
    y: 305,
    collected: false,
  },
  {
    id: 6,
    x: 1660,
    y: 350,
    collected: false,
  },
  {
    id: 7,
    x: 1980,
    y: 300,
    collected: false,
  },
  {
    id: 8,
    x: 2270,
    y: 350,
    collected: false,
  },
  {
    id: 9,
    x: 2580,
    y: 310,
    collected: false,
  },
  {
    id: 10,
    x: 2690,
    y: 310,
    collected: false,
  },
  {
    id: 11,
    x: 2920,
    y: 430,
    collected: false,
  },
];

const OBSTACLES: Obstacle[] = [
  {
    id: 1,
    x: 650,
    y: FLOOR_Y - 42,
    width: 38,
    height: 42,
  },
  {
    id: 2,
    x: 1210,
    y: FLOOR_Y - 48,
    width: 40,
    height: 48,
  },
  {
    id: 3,
    x: 1815,
    y: FLOOR_Y - 45,
    width: 40,
    height: 45,
  },
  {
    id: 4,
    x: 2435,
    y: FLOOR_Y - 50,
    width: 42,
    height: 50,
  },
];

/*
 * BUILD 04
 * Basic enemies.
 */
const INITIAL_ENEMIES: Enemy[] = [
  {
    id: 1,
    x: 560,
    y: FLOOR_Y - ENEMY_HEIGHT,
    width: ENEMY_WIDTH,
    height: ENEMY_HEIGHT,
    alive: true,
  },
  {
    id: 2,
    x: 1120,
    y: FLOOR_Y - ENEMY_HEIGHT,
    width: ENEMY_WIDTH,
    height: ENEMY_HEIGHT,
    alive: true,
  },
  {
    id: 3,
    x: 1740,
    y: FLOOR_Y - ENEMY_HEIGHT,
    width: ENEMY_WIDTH,
    height: ENEMY_HEIGHT,
    alive: true,
  },
  {
    id: 4,
    x: 2320,
    y: FLOOR_Y - ENEMY_HEIGHT,
    width: ENEMY_WIDTH,
    height: ENEMY_HEIGHT,
    alive: true,
  },
];

function intersects(
  a: {
    x: number;
    y: number;
    width: number;
    height: number;
  },
  b: {
    x: number;
    y: number;
    width: number;
    height: number;
  },
) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes
    .toString()
    .padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

export default function ArcadePage() {
  const [gameState, setGameState] =
    useState<GameState>("start");

  const [player, setPlayer] =
    useState<PlayerState>(INITIAL_PLAYER);

  const [score, setScore] = useState(0);
  const [neobytes, setNeobytes] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [cameraX, setCameraX] = useState(0);
  const [hp, setHp] = useState(INITIAL_HP);

  const [enemies, setEnemies] =
    useState<Enemy[]>(INITIAL_ENEMIES);

  const [neobytesState, setNeobytesState] =
    useState<Neobyte[]>(INITIAL_NEOBYTES);

  const keysRef =
    useRef<Set<string>>(new Set());

  const playerRef =
    useRef<PlayerState>(INITIAL_PLAYER);

  const viewportRef =
    useRef<HTMLDivElement>(null);

  const gameStateRef =
    useRef<GameState>("start");

  const enemiesRef =
    useRef<Enemy[]>(INITIAL_ENEMIES);

  const hpRef =
    useRef(INITIAL_HP);

  const comboRef =
    useRef(0);

  const attackTimeoutRef =
    useRef<number | null>(null);

  const damageCooldownRef =
    useRef<number>(0);

  const timerRef =
    useRef<number | null>(null);

  useEffect(() => {
    playerRef.current = player;
  }, [player]);

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  /*
   * START / RESET GAME
   */
  const startGame = () => {
    const resetPlayer = {
      ...INITIAL_PLAYER,
    };

    const resetEnemies =
      INITIAL_ENEMIES.map((enemy) => ({
        ...enemy,
        alive: true,
      }));

    playerRef.current = resetPlayer;
    enemiesRef.current = resetEnemies;

    hpRef.current = INITIAL_HP;
    comboRef.current = 0;

    setPlayer(resetPlayer);
    setEnemies(resetEnemies);

    setHp(INITIAL_HP);
    setScore(0);
    setNeobytes(0);
    setCombo(0);
    setMaxCombo(0);
    setElapsedTime(0);
    setCameraX(0);

    setNeobytesState(
      INITIAL_NEOBYTES.map((byte) => ({
        ...byte,
        collected: false,
      })),
    );

    damageCooldownRef.current = 0;

    keysRef.current.clear();

    if (attackTimeoutRef.current) {
      window.clearTimeout(
        attackTimeoutRef.current,
      );

      attackTimeoutRef.current = null;
    }

    gameStateRef.current = "playing";
    setGameState("playing");
  };

  /*
   * RETURN TO INITIAL NODE
   *
   * This does NOT navigate to the same URL.
   * It completely resets the local game state
   * and returns to the Initial Node screen.
   */
  const returnToInitialNode = () => {
    const resetPlayer = {
      ...INITIAL_PLAYER,
    };

    const resetEnemies =
      INITIAL_ENEMIES.map((enemy) => ({
        ...enemy,
        alive: true,
      }));

    playerRef.current = resetPlayer;
    enemiesRef.current = resetEnemies;

    hpRef.current = INITIAL_HP;
    comboRef.current = 0;

    setPlayer(resetPlayer);
    setEnemies(resetEnemies);

    setHp(INITIAL_HP);
    setScore(0);
    setNeobytes(0);
    setCombo(0);
    setMaxCombo(0);
    setElapsedTime(0);
    setCameraX(0);

    setNeobytesState(
      INITIAL_NEOBYTES.map((byte) => ({
        ...byte,
        collected: false,
      })),
    );

    damageCooldownRef.current = 0;

    keysRef.current.clear();

    if (attackTimeoutRef.current) {
      window.clearTimeout(
        attackTimeoutRef.current,
      );

      attackTimeoutRef.current = null;
    }

    if (timerRef.current) {
      window.clearInterval(
        timerRef.current,
      );

      timerRef.current = null;
    }

    gameStateRef.current = "start";
    setGameState("start");
  };

  /*
   * TIMER
   */
  useEffect(() => {
    if (gameState !== "playing") {
      if (timerRef.current) {
        window.clearInterval(
          timerRef.current,
        );

        timerRef.current = null;
      }

      return;
    }

    timerRef.current =
      window.setInterval(() => {
        setElapsedTime(
          (previous) => previous + 1,
        );
      }, 1000);

    return () => {
      if (timerRef.current) {
        window.clearInterval(
          timerRef.current,
        );

        timerRef.current = null;
      }
    };
  }, [gameState]);

  /*
   * KEYBOARD INPUT
   */
  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      const key =
        event.key.toLowerCase();

      if (
        [
          "arrowleft",
          "arrowright",
          "arrowup",
          " ",
          "a",
          "d",
          "x",
          "j",
        ].includes(key)
      ) {
        event.preventDefault();
      }

      keysRef.current.add(key);

      if (
        gameStateRef.current !==
        "playing"
      ) {
        return;
      }

      /*
       * JUMP
       */
      if (
        key === " " ||
        key === "arrowup"
      ) {
        const current =
          playerRef.current;

        if (current.onGround) {
          const nextPlayer = {
            ...current,
            velocityY: JUMP_FORCE,
            onGround: false,
          };

          playerRef.current =
            nextPlayer;

          setPlayer(nextPlayer);
        }
      }

      /*
       * ATTACK
       */
      if (
        key === "x" ||
        key === "j"
      ) {
        const current =
          playerRef.current;

        if (current.attacking) {
          return;
        }

        const attackingPlayer = {
          ...current,
          attacking: true,
        };

        playerRef.current =
          attackingPlayer;

        setPlayer(
          attackingPlayer,
        );

        if (
          attackTimeoutRef.current
        ) {
          window.clearTimeout(
            attackTimeoutRef.current,
          );
        }

        attackTimeoutRef.current =
          window.setTimeout(() => {
            setPlayer(
              (previous) => ({
                ...previous,
                attacking: false,
              }),
            );

            playerRef.current = {
              ...playerRef.current,
              attacking: false,
            };
          }, 180);
      }
    };

    const handleKeyUp = (
      event: KeyboardEvent,
    ) => {
      keysRef.current.delete(
        event.key.toLowerCase(),
      );
    };

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    window.addEventListener(
      "keyup",
      handleKeyUp,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );

      window.removeEventListener(
        "keyup",
        handleKeyUp,
      );
    };
  }, []);

  /*
   * MAIN GAME LOOP
   */
  useEffect(() => {
    let animationFrame = 0;

    const updateGame = () => {
      if (
        gameStateRef.current !==
        "playing"
      ) {
        animationFrame =
          window.requestAnimationFrame(
            updateGame,
          );

        return;
      }

      const keys =
        keysRef.current;

      const current =
        playerRef.current;

      let nextX = current.x;
      let nextY = current.y;

      let nextVelocityY =
        current.velocityY;

      let nextFacing =
        current.facing;

      let nextOnGround = false;

      const movingLeft =
        keys.has("arrowleft") ||
        keys.has("a");

      const movingRight =
        keys.has("arrowright") ||
        keys.has("d");

      /*
       * HORIZONTAL MOVEMENT
       */
      if (movingLeft) {
        nextX -= MOVE_SPEED;
        nextFacing = "left";
      }

      if (movingRight) {
        nextX += MOVE_SPEED;
        nextFacing = "right";
      }

      /*
       * WORLD BOUNDARIES
       */
      nextX = Math.max(20, nextX);

      nextX = Math.min(
        WORLD_WIDTH -
          PLAYER_WIDTH -
          20,
        nextX,
      );

      /*
       * GRAVITY
       */
      nextVelocityY += GRAVITY;
      nextY += nextVelocityY;

      const previousBottom =
        current.y +
        PLAYER_HEIGHT;

      /*
       * FLOOR COLLISION
       */
      const floorPosition =
        FLOOR_Y -
        PLAYER_HEIGHT;

      if (
        nextY >= floorPosition &&
        previousBottom <= FLOOR_Y
      ) {
        nextY = floorPosition;
        nextVelocityY = 0;
        nextOnGround = true;
      }

      /*
       * PLATFORM COLLISION
       */
      for (
        const platform of PLATFORMS
      ) {
        const playerBottom =
          nextY +
          PLAYER_HEIGHT;

        const horizontalOverlap =
          nextX +
            PLAYER_WIDTH >
            platform.x &&
          nextX <
            platform.x +
              platform.width;

        const crossingPlatform =
          previousBottom <=
            platform.y &&
          playerBottom >=
            platform.y;

        if (
          horizontalOverlap &&
          crossingPlatform &&
          nextVelocityY >= 0
        ) {
          nextY =
            platform.y -
            PLAYER_HEIGHT;

          nextVelocityY = 0;
          nextOnGround = true;

          break;
        }
      }

      /*
       * OBSTACLE COLLISION
       */
      const nextPlayerBox = {
        x: nextX,
        y: nextY,
        width: PLAYER_WIDTH,
        height: PLAYER_HEIGHT,
      };

      for (
        const obstacle of OBSTACLES
      ) {
        const obstacleBox = {
          x: obstacle.x,
          y: obstacle.y,
          width: obstacle.width,
          height: obstacle.height,
        };

        if (
          intersects(
            nextPlayerBox,
            obstacleBox,
          )
        ) {
          if (
            current.x <
            obstacle.x
          ) {
            nextX =
              obstacle.x -
              PLAYER_WIDTH -
              1;
          } else {
            nextX =
              obstacle.x +
              obstacle.width +
              1;
          }

          nextVelocityY =
            Math.max(
              nextVelocityY,
              0,
            );
        }
      }

      /*
       * PLAYER BOX
       */
      const playerBox = {
        x: nextX,
        y: nextY,
        width: PLAYER_WIDTH,
        height: PLAYER_HEIGHT,
      };

      /*
       * COMBAT
       */
      const attackRange = {
        x:
          nextFacing === "right"
            ? nextX +
              PLAYER_WIDTH
            : nextX - 48,
        y: nextY + 16,
        width: 48,
        height: 34,
      };

      if (current.attacking) {
        let defeatedEnemyId:
          number | null = null;

        enemiesRef.current =
          enemiesRef.current.map(
            (enemy) => {
              if (
                !enemy.alive ||
                defeatedEnemyId !==
                  null
              ) {
                return enemy;
              }

              const enemyBox = {
                x: enemy.x,
                y: enemy.y,
                width: enemy.width,
                height: enemy.height,
              };

              if (
                intersects(
                  attackRange,
                  enemyBox,
                )
              ) {
                defeatedEnemyId =
                  enemy.id;

                return {
                  ...enemy,
                  alive: false,
                };
              }

              return enemy;
            },
          );

        if (
          defeatedEnemyId !== null
        ) {
          const nextCombo =
            comboRef.current + 1;

          comboRef.current =
            nextCombo;

          setCombo(nextCombo);

          setMaxCombo(
            (previous) =>
              Math.max(
                previous,
                nextCombo,
              ),
          );

          setScore(
            (previous) =>
              previous +
              250 *
                Math.max(
                  1,
                  nextCombo,
                ),
          );

          setEnemies(
            [...enemiesRef.current],
          );
        }
      }

      /*
       * ENEMY CONTACT DAMAGE
       */
      if (
        damageCooldownRef.current >
        0
      ) {
        damageCooldownRef.current -=
          1;
      }

      if (
        damageCooldownRef.current <=
        0
      ) {
        const touchingEnemy =
          enemiesRef.current.some(
            (enemy) => {
              if (!enemy.alive) {
                return false;
              }

              const enemyBox = {
                x: enemy.x,
                y: enemy.y,
                width: enemy.width,
                height: enemy.height,
              };

              return intersects(
                playerBox,
                enemyBox,
              );
            },
          );

        if (touchingEnemy) {
          const nextHp =
            Math.max(
              0,
              hpRef.current - 1,
            );

          hpRef.current =
            nextHp;

          setHp(nextHp);

          comboRef.current = 0;
          setCombo(0);

          damageCooldownRef.current =
            60;

          /*
           * Small knockback.
           */
          nextX =
            nextFacing === "right"
              ? nextX - 18
              : nextX + 18;

          if (nextHp <= 0) {
            gameStateRef.current =
              "gameover";

            setGameState(
              "gameover",
            );

            keysRef.current.clear();
          }
        }
      }

      /*
       * COLLECT NEOBYTES
       */
      let collectedSomething =
        false;

      setNeobytesState(
        (previous) =>
          previous.map(
            (byte) => {
              if (byte.collected) {
                return byte;
              }

              const byteBox = {
                x: byte.x - 10,
                y: byte.y - 10,
                width: 20,
                height: 20,
              };

              if (
                intersects(
                  playerBox,
                  byteBox,
                )
              ) {
                collectedSomething =
                  true;

                return {
                  ...byte,
                  collected: true,
                };
              }

              return byte;
            },
          ),
      );

      if (collectedSomething) {
        const nextCombo =
          comboRef.current + 1;

        comboRef.current =
          nextCombo;

        setNeobytes(
          (previous) =>
            previous + 1,
        );

        setCombo(nextCombo);

        setMaxCombo(
          (previous) =>
            Math.max(
              previous,
              nextCombo,
            ),
        );

        setScore(
          (previous) => {
            const multiplier =
              Math.max(
                1,
                nextCombo,
              );

            return (
              previous +
              100 *
                multiplier
            );
          },
        );
      }

      /*
       * CAMERA
       */
      const viewportWidth =
        viewportRef.current
          ?.clientWidth ??
        1000;

      const desiredCamera =
        nextX -
        viewportWidth *
          0.42;

      const maxCamera =
        Math.max(
          0,
          WORLD_WIDTH -
            viewportWidth,
        );

      const boundedCamera =
        Math.max(
          0,
          Math.min(
            desiredCamera,
            maxCamera,
          ),
        );

      setCameraX(
        boundedCamera,
      );

      /*
       * UPDATE PLAYER
       */
      const nextPlayer = {
        ...current,
        x: nextX,
        y: nextY,
        velocityY:
          nextVelocityY,
        facing: nextFacing,
        onGround: nextOnGround,
      };

      playerRef.current =
        nextPlayer;

      setPlayer(nextPlayer);

      /*
       * REACH END
       */
      const finishLine =
        WORLD_WIDTH - 150;

      if (
        nextX >= finishLine &&
        gameStateRef.current ===
          "playing"
      ) {
        gameStateRef.current =
          "complete";

        setGameState(
          "complete",
        );

        keysRef.current.clear();
      }

      animationFrame =
        window.requestAnimationFrame(
          updateGame,
        );
    };

    animationFrame =
      window.requestAnimationFrame(
        updateGame,
      );

    return () => {
      window.cancelAnimationFrame(
        animationFrame,
      );
    };
  }, []);

  /*
   * PASSIVE SCORE
   */
  useEffect(() => {
    if (
      gameState !==
      "playing"
    ) {
      return;
    }

    const interval =
      window.setInterval(() => {
        const keys =
          keysRef.current;

        if (
          keys.has("arrowleft") ||
          keys.has("arrowright") ||
          keys.has("a") ||
          keys.has("d")
        ) {
          setScore(
            (previous) =>
              previous + 1,
          );
        }
      }, 1000);

    return () =>
      window.clearInterval(
        interval,
      );
  }, [gameState]);

  /*
   * MOBILE CONTROLS
   */
  const holdKey = (
    key: string,
  ) => {
    if (
      gameStateRef.current !==
      "playing"
    ) {
      return;
    }

    keysRef.current.add(key);
  };

  const releaseKey = (
    key: string,
  ) => {
    keysRef.current.delete(key);
  };

  const triggerJump = () => {
    if (
      gameStateRef.current !==
      "playing"
    ) {
      return;
    }

    const current =
      playerRef.current;

    if (!current.onGround) {
      return;
    }

    const nextPlayer = {
      ...current,
      velocityY: JUMP_FORCE,
      onGround: false,
    };

    playerRef.current =
      nextPlayer;

    setPlayer(nextPlayer);
  };

  const triggerAttack = () => {
    if (
      gameStateRef.current !==
      "playing"
    ) {
      return;
    }

    const event =
      new KeyboardEvent(
        "keydown",
        {
          key: "x",
        },
      );

    window.dispatchEvent(event);
  };

  const progress = Math.min(
    100,
    Math.round(
      (player.x /
        (WORLD_WIDTH -
          PLAYER_WIDTH)) *
        100,
    ),
  );

  /*
   * START SCREEN
   */
  if (gameState === "start") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#03050a] px-4 py-8 font-mono text-cyan-400">
        <div className="relative w-full max-w-2xl overflow-hidden border border-cyan-500/30 bg-[#050912] p-8 text-center shadow-[0_0_50px_rgba(0,255,255,0.08)] sm:p-12">
          <div className="pointer-events-none absolute inset-0 bg-[url('/scanlines.png')] opacity-10 mix-blend-overlay" />

          <div className="relative z-10">
            <div className="text-[9px] uppercase tracking-[0.45em] text-cyan-500/50">
              VΣLOHE SYSTEM
            </div>

            <h1 className="mt-4 text-2xl font-bold uppercase tracking-[0.25em] text-white sm:text-4xl">
              ARCADE
            </h1>

            <div className="mt-3 text-[10px] uppercase tracking-[0.3em] text-cyan-400">
              INITIAL NODE // AEG-001
            </div>

            <div className="mx-auto my-10 h-px w-32 bg-cyan-400/30" />

            <div className="text-xs uppercase tracking-[0.25em] text-cyan-300">
              NEOBYTE RUN
            </div>

            <p className="mx-auto mt-4 max-w-md text-[9px] uppercase leading-relaxed tracking-[0.15em] text-cyan-500/45">
              Enter the recovered sector.
              Collect available Neobytes.
              Survive hostile nodes.
              Reach the archive node.
            </p>

            <button
              type="button"
              onClick={startGame}
              className="mt-10 border border-cyan-400/70 bg-cyan-500/10 px-10 py-4 text-xs uppercase tracking-[0.3em] text-cyan-200 transition-all hover:border-cyan-300 hover:bg-cyan-400/20 hover:shadow-[0_0_25px_rgba(0,255,255,0.2)]"
            >
              START RUN →
            </button>

            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-cyan-500/10 pt-6 text-[8px] uppercase tracking-[0.18em] text-cyan-500/35">
              <div>
                <div className="text-cyan-500/60">
                  MOVE
                </div>
                <div className="mt-1">
                  A / D
                </div>
              </div>

              <div>
                <div className="text-cyan-500/60">
                  JUMP
                </div>
                <div className="mt-1">
                  SPACE
                </div>
              </div>

              <div>
                <div className="text-cyan-500/60">
                  ATTACK
                </div>
                <div className="mt-1">
                  X / J
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  /*
   * GAME OVER SCREEN
   */
  if (gameState === "gameover") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#03050a] px-4 py-8 font-mono text-cyan-400">
        <div className="relative w-full max-w-2xl overflow-hidden border border-red-500/30 bg-[#050912] p-8 shadow-[0_0_50px_rgba(255,0,80,0.08)] sm:p-12">
          <div className="pointer-events-none absolute inset-0 bg-[url('/scanlines.png')] opacity-10 mix-blend-overlay" />

          <div className="relative z-10">
            <div className="text-center">
              <div className="text-[9px] uppercase tracking-[0.4em] text-red-500/50">
                VΣLOHE SYSTEM
              </div>

              <h1 className="mt-4 text-2xl font-bold uppercase tracking-[0.18em] text-white sm:text-3xl">
                YOU WERE TERMINATED
              </h1>

              <div className="mt-3 text-[9px] uppercase tracking-[0.3em] text-red-400/70">
                NODE AEG-001 // IDENTITY SIGNAL LOST
              </div>
            </div>

            <div className="mx-auto my-8 h-px w-full bg-red-500/15" />

            <div className="grid grid-cols-2 gap-px border border-red-500/10 bg-red-500/10 sm:grid-cols-4">
              <div className="bg-[#050912] p-5 text-center">
                <div className="text-[8px] uppercase tracking-[0.2em] text-red-500/40">
                  SCORE
                </div>

                <div className="mt-2 text-xl font-bold text-cyan-300">
                  {score
                    .toString()
                    .padStart(6, "0")}
                </div>
              </div>

              <div className="bg-[#050912] p-5 text-center">
                <div className="text-[8px] uppercase tracking-[0.2em] text-red-500/40">
                  NEOBYTES
                </div>

                <div className="mt-2 text-xl font-bold text-purple-300">
                  {neobytes
                    .toString()
                    .padStart(2, "0")}
                </div>
              </div>

              <div className="bg-[#050912] p-5 text-center">
                <div className="text-[8px] uppercase tracking-[0.2em] text-red-500/40">
                  TIME
                </div>

                <div className="mt-2 text-xl font-bold text-cyan-200">
                  {formatTime(
                    elapsedTime,
                  )}
                </div>
              </div>

              <div className="bg-[#050912] p-5 text-center">
                <div className="text-[8px] uppercase tracking-[0.2em] text-red-500/40">
                  MAX COMBO
                </div>

                <div className="mt-2 text-xl font-bold text-yellow-300">
                  x{maxCombo}
                </div>
              </div>
            </div>

            <div className="mt-8 border border-red-500/10 bg-red-950/[0.04] p-5 text-center">
              <div className="text-[8px] uppercase tracking-[0.25em] text-red-500/40">
                NODE STATUS
              </div>

              <div className="mt-2 text-sm tracking-[0.25em] text-red-400">
                CONNECTION LOST
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={startGame}
                className="border border-cyan-400/70 bg-cyan-500/10 px-10 py-4 text-xs uppercase tracking-[0.3em] text-cyan-200 transition-all hover:border-cyan-300 hover:bg-cyan-400/20 hover:shadow-[0_0_25px_rgba(0,255,255,0.2)]"
              >
                RETRY RUN →
              </button>

              <button
                type="button"
                onClick={returnToInitialNode}
                className="border border-cyan-500/30 bg-cyan-950/20 px-8 py-3 text-[10px] uppercase tracking-[0.25em] text-cyan-400/70 transition-all hover:border-cyan-400/60 hover:bg-cyan-500/10 hover:text-cyan-300"
              >
                ← RETURN TO INITIAL NODE
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  /*
   * RESULT SCREEN
   */
  if (gameState === "complete") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#03050a] px-4 py-8 font-mono text-cyan-400">
        <div className="relative w-full max-w-2xl overflow-hidden border border-cyan-500/30 bg-[#050912] p-8 shadow-[0_0_50px_rgba(0,255,255,0.08)] sm:p-12">
          <div className="pointer-events-none absolute inset-0 bg-[url('/scanlines.png')] opacity-10 mix-blend-overlay" />

          <div className="relative z-10">
            <div className="text-center">
              <div className="text-[9px] uppercase tracking-[0.4em] text-cyan-500/50">
                VΣLOHE SYSTEM
              </div>

              <h1 className="mt-4 text-2xl font-bold uppercase tracking-[0.2em] text-white sm:text-3xl">
                RUN COMPLETE
              </h1>

              <div className="mt-3 text-[9px] uppercase tracking-[0.3em] text-cyan-400/70">
                ARCHIVE NODE AEG-001 REACHED
              </div>
            </div>

            <div className="mx-auto my-8 h-px w-full bg-cyan-500/15" />

            <div className="grid grid-cols-2 gap-px border border-cyan-500/10 bg-cyan-500/10 sm:grid-cols-4">
              <div className="bg-[#050912] p-5 text-center">
                <div className="text-[8px] uppercase tracking-[0.2em] text-cyan-500/40">
                  SCORE
                </div>

                <div className="mt-2 text-xl font-bold text-cyan-300">
                  {score
                    .toString()
                    .padStart(6, "0")}
                </div>
              </div>

              <div className="bg-[#050912] p-5 text-center">
                <div className="text-[8px] uppercase tracking-[0.2em] text-cyan-500/40">
                  NEOBYTES
                </div>

                <div className="mt-2 text-xl font-bold text-purple-300">
                  {neobytes
                    .toString()
                    .padStart(2, "0")}
                </div>
              </div>

              <div className="bg-[#050912] p-5 text-center">
                <div className="text-[8px] uppercase tracking-[0.2em] text-cyan-500/40">
                  TIME
                </div>

                <div className="mt-2 text-xl font-bold text-cyan-200">
                  {formatTime(
                    elapsedTime,
                  )}
                </div>
              </div>

              <div className="bg-[#050912] p-5 text-center">
                <div className="text-[8px] uppercase tracking-[0.2em] text-cyan-500/40">
                  MAX COMBO
                </div>

                <div className="mt-2 text-xl font-bold text-yellow-300">
                  x{maxCombo}
                </div>
              </div>
            </div>

            <div className="mt-8 border border-cyan-500/10 bg-cyan-950/[0.04] p-5 text-center">
              <div className="text-[8px] uppercase tracking-[0.25em] text-cyan-500/40">
                ARCHIVE PROGRESS
              </div>

              <div className="mt-2 text-sm tracking-[0.25em] text-cyan-300">
                {progress}%
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={startGame}
                className="border border-cyan-400/70 bg-cyan-500/10 px-10 py-4 text-xs uppercase tracking-[0.3em] text-cyan-200 transition-all hover:border-cyan-300 hover:bg-cyan-400/20 hover:shadow-[0_0_25px_rgba(0,255,255,0.2)]"
              >
                PLAY AGAIN →
              </button>

              <button
                type="button"
                onClick={returnToInitialNode}
                className="border border-cyan-500/30 bg-cyan-950/20 px-8 py-3 text-[10px] uppercase tracking-[0.25em] text-cyan-400/70 transition-all hover:border-cyan-400/60 hover:bg-cyan-500/10 hover:text-cyan-300"
              >
                ← RETURN TO INITIAL NODE
              </button>
            </div>

            <div className="mt-8 border-t border-cyan-500/10 pt-5 text-center text-[8px] uppercase tracking-[0.2em] text-cyan-500/25">
              RUN DATA // TEMPORARY SESSION RECORD
            </div>
          </div>
        </div>
      </main>
    );
  }

  /*
   * PLAY SCREEN
   */
  return (
    <main className="min-h-screen bg-[#03050a] px-3 py-4 font-mono text-cyan-400 sm:px-5 sm:py-6 md:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col">

        {/* HUD */}
        <header className="mb-3 flex flex-col gap-3 border-b border-cyan-500/20 pb-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-[8px] uppercase tracking-[0.4em] text-cyan-500/50 sm:text-[9px]">
              VΣLOHE SYSTEM
            </div>

            <h1 className="mt-1 text-xs font-bold uppercase tracking-[0.25em] text-white sm:text-sm">
              ARCADE // INITIAL NODE
            </h1>
          </div>

          <div className="flex flex-wrap gap-5 text-right">

            {/* HP */}
            <div>
              <div className="text-[7px] uppercase tracking-[0.2em] text-cyan-500/40">
                HP
              </div>

              <div className="flex gap-1 text-base sm:text-lg">
                {[1, 2, 3].map(
                  (heart) => (
                    <span
                      key={heart}
                      className={
                        heart <= hp
                          ? "text-red-400"
                          : "text-red-950"
                      }
                    >
                      ◆
                    </span>
                  ),
                )}
              </div>
            </div>

            {/* SCORE */}
            <div>
              <div className="text-[7px] uppercase tracking-[0.2em] text-cyan-500/40">
                SCORE
              </div>

              <div className="text-base font-bold tracking-widest text-cyan-300 sm:text-lg">
                {score
                  .toString()
                  .padStart(6, "0")}
              </div>
            </div>

            {/* NEOBYTES */}
            <div>
              <div className="text-[7px] uppercase tracking-[0.2em] text-cyan-500/40">
                NEOBYTES
              </div>

              <div className="text-base font-bold tracking-widest text-purple-300 sm:text-lg">
                {neobytes
                  .toString()
                  .padStart(3, "0")}
              </div>
            </div>

            {/* TIME */}
            <div>
              <div className="text-[7px] uppercase tracking-[0.2em] text-cyan-500/40">
                TIME
              </div>

              <div className="text-base font-bold tracking-widest text-cyan-200 sm:text-lg">
                {formatTime(
                  elapsedTime,
                )}
              </div>
            </div>

            {/* COMBO */}
            <div>
              <div className="text-[7px] uppercase tracking-[0.2em] text-cyan-500/40">
                COMBO
              </div>

              <div className="text-base font-bold tracking-widest text-yellow-300 sm:text-lg">
                x{combo}
              </div>
            </div>
          </div>
        </header>

        {/* GAME VIEWPORT */}
        <section
          ref={viewportRef}
          className="relative h-[clamp(500px,70dvh,560px)] w-full overflow-hidden border border-cyan-500/20 bg-[#050912] shadow-[0_0_40px_rgba(0,255,255,0.05)]"
        >
          {/* Scanlines */}
          <div className="pointer-events-none absolute inset-0 z-40 bg-[url('/scanlines.png')] opacity-10 mix-blend-overlay" />

          {/* Grid */}
          <div className="pointer-events-none absolute inset-0 z-20 opacity-[0.08] [background-image:linear-gradient(rgba(0,255,255,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.3)_1px,transparent_1px)] [background-size:50px_50px]" />

          {/* Atmosphere */}
          <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_30%,rgba(0,255,255,0.08),transparent_45%)]" />

          {/* WORLD */}
          <div
            className="absolute left-0 top-0"
            style={{
              width: `${WORLD_WIDTH}px`,
              height: `${WORLD_HEIGHT}px`,
              transform: `translateX(-${cameraX}px)`,
            }}
          >
            {/* Sector labels */}
            <div className="absolute left-12 top-16 text-[8px] uppercase tracking-[0.3em] text-cyan-500/20">
              SECTOR // 001
            </div>

            <div className="absolute left-[1050px] top-16 text-[8px] uppercase tracking-[0.3em] text-cyan-500/20">
              SECTOR // 002
            </div>

            <div className="absolute left-[2050px] top-16 text-[8px] uppercase tracking-[0.3em] text-cyan-500/20">
              SECTOR // 003
            </div>

            {/* Background structures */}
            <div className="absolute bottom-[90px] left-[300px] h-[180px] w-[70px] border border-cyan-500/10 bg-cyan-500/[0.02]" />

            <div className="absolute bottom-[90px] left-[380px] h-[240px] w-[90px] border border-cyan-500/10 bg-cyan-500/[0.02]" />

            <div className="absolute bottom-[90px] left-[1100px] h-[220px] w-[100px] border border-purple-500/10 bg-purple-500/[0.02]" />

            <div className="absolute bottom-[90px] left-[1900px] h-[280px] w-[110px] border border-cyan-500/10 bg-cyan-500/[0.02]" />

            {/* FLOOR */}
            <div
              className="absolute left-0 right-0 h-px bg-cyan-400 shadow-[0_0_15px_rgba(0,255,255,0.8)]"
              style={{
                top: `${FLOOR_Y}px`,
              }}
            />

            <div
              className="absolute left-0 right-0 bg-gradient-to-b from-cyan-500/[0.04] to-transparent"
              style={{
                top: `${FLOOR_Y + 1}px`,
                height: "90px",
              }}
            />

            {/* PLATFORMS */}
            {PLATFORMS.map(
              (platform) => (
                <div
                  key={`${platform.x}-${platform.y}`}
                  className="absolute border border-cyan-400/60 bg-cyan-400/10 shadow-[0_0_12px_rgba(0,255,255,0.15)]"
                  style={{
                    left: `${platform.x}px`,
                    top: `${platform.y}px`,
                    width: `${platform.width}px`,
                    height: `${platform.height}px`,
                  }}
                >
                  <div className="absolute left-0 right-0 top-0 h-px bg-cyan-300 shadow-[0_0_8px_rgba(0,255,255,0.8)]" />
                </div>
              ),
            )}

            {/* OBSTACLES */}
            {OBSTACLES.map(
              (obstacle) => (
                <div
                  key={obstacle.id}
                  className="absolute border border-red-500/50 bg-red-500/10 shadow-[0_0_18px_rgba(255,0,80,0.12)]"
                  style={{
                    left: `${obstacle.x}px`,
                    top: `${obstacle.y}px`,
                    width: `${obstacle.width}px`,
                    height: `${obstacle.height}px`,
                  }}
                >
                  <div className="absolute inset-x-1 top-2 h-px bg-red-400/60" />

                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[7px] tracking-widest text-red-400/50">
                    !
                  </div>
                </div>
              ),
            )}

            {/* ENEMIES */}
            {enemies.map(
              (enemy) => {
                if (!enemy.alive) {
                  return null;
                }

                return (
                  <div
                    key={enemy.id}
                    className="absolute"
                    style={{
                      left: `${enemy.x}px`,
                      top: `${enemy.y}px`,
                      width: `${enemy.width}px`,
                      height: `${enemy.height}px`,
                    }}
                  >
                    <div className="absolute inset-0 border border-red-400/70 bg-red-500/10 shadow-[0_0_18px_rgba(255,0,80,0.35)]" />

                    <div className="absolute left-1/2 top-3 h-4 w-4 -translate-x-1/2 border border-red-300 bg-red-500/30 shadow-[0_0_12px_rgba(255,0,80,0.8)]" />

                    <div className="absolute left-2 top-8 h-7 w-8 border border-red-500/60 bg-red-500/10" />

                    <div className="absolute bottom-0 left-2 h-4 w-2 bg-red-500/70" />

                    <div className="absolute bottom-0 right-2 h-4 w-2 bg-red-500/70" />

                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[6px] uppercase tracking-widest text-red-400/50">
                      HOSTILE
                    </div>
                  </div>
                );
              },
            )}

            {/* NEOBYTES */}
            {neobytesState.map(
              (byte) => {
                if (byte.collected) {
                  return null;
                }

                return (
                  <div
                    key={byte.id}
                    className="absolute flex h-6 w-6 items-center justify-center"
                    style={{
                      left: `${byte.x - 12}px`,
                      top: `${byte.y - 12}px`,
                    }}
                  >
                    <div className="absolute h-3 w-3 rotate-45 border border-purple-300 bg-purple-400/30 shadow-[0_0_14px_rgba(180,80,255,0.9)]" />

                    <div className="absolute h-1 w-1 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,1)]" />
                  </div>
                );
              },
            )}

            {/* PLAYER */}
            <div
              className="absolute"
              style={{
                left: `${player.x}px`,
                top: `${player.y}px`,
                width: `${PLAYER_WIDTH}px`,
                height: `${PLAYER_HEIGHT}px`,
                transform:
                  player.facing === "left"
                    ? "scaleX(-1)"
                    : "scaleX(1)",
              }}
            >
              {player.attacking && (
                <div className="absolute -right-10 top-5 h-5 w-10 border-y-2 border-cyan-300 bg-cyan-400/20 shadow-[0_0_20px_rgba(0,255,255,0.8)]" />
              )}

              <div className="absolute left-3 top-0 h-5 w-5 border border-cyan-300 bg-cyan-950 shadow-[0_0_12px_rgba(0,255,255,0.5)]" />

              <div className="absolute left-1 top-6 h-9 w-9 border border-cyan-400 bg-cyan-500/20 shadow-[0_0_15px_rgba(0,255,255,0.3)]">
                <div className="absolute left-2 top-2 h-1 w-5 bg-cyan-300 shadow-[0_0_8px_rgba(0,255,255,0.8)]" />
              </div>

              <div className="absolute left-2 top-15 h-7 w-2 bg-cyan-500" />

              <div className="absolute left-7 top-15 h-7 w-2 bg-cyan-500" />

              <div className="absolute -right-1 top-8 h-1 w-3 bg-cyan-200" />
            </div>

            {/* FINISH NODE */}
            <div className="absolute right-20 top-[220px] text-center">
              <div className="text-[8px] uppercase tracking-[0.3em] text-purple-400/50">
                ARCHIVE NODE
              </div>

              <div className="mx-auto mt-2 h-20 w-px bg-purple-400/30 shadow-[0_0_10px_rgba(180,80,255,0.3)]" />
            </div>
          </div>

          {/* CAMERA HUD */}
          <div className="absolute left-3 top-3 z-50 text-[7px] uppercase tracking-[0.2em] text-cyan-500/35 sm:left-4 sm:top-4 sm:text-[8px]">
            <div>
              POSITION //{" "}
              {Math.round(player.x)
                .toString()
                .padStart(4, "0")}
            </div>

            <div className="mt-1">
              NODE // AEG-001
            </div>
          </div>

          {/* DESKTOP CONTROLS */}
          <div className="absolute bottom-3 left-3 z-50 hidden text-[7px] uppercase tracking-[0.18em] text-cyan-500/40 sm:bottom-4 sm:left-4 sm:block sm:text-[8px]">
            <div>
              MOVE // A D / ← →
            </div>

            <div className="mt-1">
              JUMP // SPACE
            </div>

            <div className="mt-1">
              ATTACK // X / J
            </div>
          </div>

          {/* PROGRESS */}
          <div className="absolute bottom-3 right-3 z-50 text-right text-[7px] uppercase tracking-[0.18em] text-cyan-500/30 sm:bottom-4 sm:right-4 sm:text-[8px]">
            <div>
              ARCHIVE PROGRESS
            </div>

            <div className="mt-1 text-cyan-400/50">
              {progress}%
            </div>
          </div>
        </section>

        {/* MOBILE CONTROLS */}
        <div className="mt-3 grid grid-cols-4 gap-2 sm:hidden">
          <button
            type="button"
            onPointerDown={() =>
              holdKey("arrowleft")
            }
            onPointerUp={() =>
              releaseKey("arrowleft")
            }
            onPointerCancel={() =>
              releaseKey("arrowleft")
            }
            onPointerLeave={() =>
              releaseKey("arrowleft")
            }
            className="border border-cyan-500/30 bg-cyan-950/20 py-3 text-cyan-300 active:bg-cyan-500/20"
          >
            ←
          </button>

          <button
            type="button"
            onClick={triggerJump}
            className="border border-cyan-500/30 bg-cyan-950/20 py-3 text-[10px] text-cyan-300 active:bg-cyan-500/20"
          >
            JUMP
          </button>

          <button
            type="button"
            onClick={triggerAttack}
            className="border border-cyan-500/30 bg-cyan-950/20 py-3 text-[10px] text-cyan-300 active:bg-cyan-500/20"
          >
            ATTACK
          </button>

          <button
            type="button"
            onPointerDown={() =>
              holdKey("arrowright")
            }
            onPointerUp={() =>
              releaseKey("arrowright")
            }
            onPointerCancel={() =>
              releaseKey("arrowright")
            }
            onPointerLeave={() =>
              releaseKey("arrowright")
            }
            className="border border-cyan-500/30 bg-cyan-950/20 py-3 text-cyan-300 active:bg-cyan-500/20"
          >
            →
          </button>
        </div>

        {/* FOOTER */}
        <footer className="mt-3 flex items-center justify-between text-[7px] uppercase tracking-[0.2em] text-cyan-500/25 sm:text-[8px]">
          <span>
            ARCADE NODE // BUILD 04
          </span>

          <span>
            INPUT // ACTIVE
          </span>
        </footer>
      </div>
    </main>
  );
}