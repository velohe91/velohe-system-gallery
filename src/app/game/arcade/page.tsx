"use client";

import { useEffect, useRef, useState } from "react";

type GameState =
  | "start"
  | "playing"
  | "complete"
  | "gameover";

type PlayerState = {
  x: number;
  y: number;
  facing: "left" | "right";
  attacking: boolean;
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

type CyanSpiritAnimState = {
  frame: number;
};

/* =========================================================
WORLD
========================================================= */

const WORLD_WIDTH = 3200;
const WORLD_HEIGHT = 560;
const FLOOR_Y = 470;

/* =========================================================
PLAYER HITBOX
========================================================= */

const PLAYER_WIDTH = 48;
const PLAYER_HEIGHT = 72;

/* =========================================================
CYAN SPIRIT BOUNDS (free-float, no gravity)
========================================================= */

const CYAN_SPIRIT_MIN_Y = 60;
const CYAN_SPIRIT_MAX_Y = FLOOR_Y - PLAYER_HEIGHT - 8;
const CYAN_SPIRIT_START_Y = 370;

/* =========================================================
SPRITES
========================================================= */

const CYAN_SPIRIT_IDLE_FRAMES = [
  "/game/arcade/sprites/cyan-spirit/idle/frame-01.png",
  "/game/arcade/sprites/cyan-spirit/idle/frame-02.png",
  "/game/arcade/sprites/cyan-spirit/idle/frame-03.png",
];

const CYAN_SPIRIT_VISUAL_SIZE = 150;

/* =========================================================
MOVEMENT
========================================================= */

const MOVE_SPEED = 5.8;
const IDLE_FRAME_MS = 150;
const ATTACK_MS = 170;
const INITIAL_HP = 3;

/* =========================================================
INITIAL PLAYER
========================================================= */

const INITIAL_PLAYER: PlayerState = {
  x: 180,
  y: CYAN_SPIRIT_START_Y,
  facing: "right",
  attacking: false,
};

/* =========================================================
PLATFORMS
========================================================= */

const PLATFORMS: Platform[] = [
  { x: 430, y: 390, width: 180, height: 16 },
  { x: 700, y: 350, width: 180, height: 16 },
  { x: 980, y: 395, width: 200, height: 16 },
  { x: 1280, y: 345, width: 200, height: 16 },
  { x: 1580, y: 390, width: 220, height: 16 },
  { x: 1900, y: 340, width: 220, height: 16 },
  { x: 2200, y: 390, width: 220, height: 16 },
  { x: 2500, y: 350, width: 220, height: 16 },
];

/* =========================================================
NEOBYTES
========================================================= */

const INITIAL_NEOBYTES: Neobyte[] = [
  { id: 1, x: 350, y: 430, collected: false },
  { id: 2, x: 510, y: 350, collected: false },
  { id: 3, x: 770, y: 310, collected: false },
  { id: 4, x: 1040, y: 355, collected: false },
  { id: 5, x: 1340, y: 305, collected: false },
  { id: 6, x: 1660, y: 350, collected: false },
  { id: 7, x: 1980, y: 300, collected: false },
  { id: 8, x: 2270, y: 350, collected: false },
  { id: 9, x: 2580, y: 310, collected: false },
  { id: 10, x: 2690, y: 310, collected: false },
  { id: 11, x: 2920, y: 430, collected: false },
];

/* =========================================================
OBSTACLES
========================================================= */

const OBSTACLES: Obstacle[] = [
  { id: 1, x: 650, y: FLOOR_Y - 42, width: 38, height: 42 },
  { id: 2, x: 1210, y: FLOOR_Y - 48, width: 40, height: 48 },
  { id: 3, x: 1815, y: FLOOR_Y - 45, width: 40, height: 45 },
  { id: 4, x: 2435, y: FLOOR_Y - 50, width: 42, height: 50 },
];

/* =========================================================
ENEMIES
========================================================= */

const ENEMY_WIDTH = 42;
const ENEMY_HEIGHT = 58;

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

/* =========================================================
HELPERS
========================================================= */

function intersects(
  a: { x: number; y: number; width: number; height: number },
  b: { x: number; y: number; width: number; height: number },
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
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

function playersEqual(a: PlayerState, b: PlayerState) {
  return (
    a.x === b.x &&
    a.y === b.y &&
    a.facing === b.facing &&
    a.attacking === b.attacking
  );
}

/** Soft push-out on shallow axis when overlapping an obstacle */
function resolveObstacleOverlap(
  box: { x: number; y: number; width: number; height: number },
  obstacle: Obstacle,
) {
  const overlapLeft = box.x + box.width - obstacle.x;
  const overlapRight = obstacle.x + obstacle.width - box.x;
  const overlapTop = box.y + box.height - obstacle.y;
  const overlapBottom = obstacle.y + obstacle.height - box.y;

  const minX = Math.min(overlapLeft, overlapRight);
  const minY = Math.min(overlapTop, overlapBottom);

  if (minX < minY) {
    if (overlapLeft < overlapRight) {
      return { x: obstacle.x - box.width, y: box.y };
    }
    return { x: obstacle.x + obstacle.width, y: box.y };
  }

  if (overlapTop < overlapBottom) {
    return { x: box.x, y: obstacle.y - box.height };
  }
  return { x: box.x, y: obstacle.y + obstacle.height };
}

/* =========================================================
PAGE
========================================================= */

export default function ArcadePage() {
  const [gameState, setGameState] = useState<GameState>("start");
  const [player, setPlayer] = useState<PlayerState>(INITIAL_PLAYER);
  const [score, setScore] = useState(0);
  const [neobytes, setNeobytes] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [cameraX, setCameraX] = useState(0);
  const [hp, setHp] = useState(INITIAL_HP);
  const [enemies, setEnemies] = useState<Enemy[]>(INITIAL_ENEMIES);
  const [neobytesState, setNeobytesState] =
    useState<Neobyte[]>(INITIAL_NEOBYTES);
  const [animState, setAnimState] = useState<CyanSpiritAnimState>({
    frame: 0,
  });

  const keysRef = useRef<Set<string>>(new Set());
  const playerRef = useRef<PlayerState>(INITIAL_PLAYER);
  const viewportRef = useRef<HTMLDivElement>(null);
  const gameStateRef = useRef<GameState>("start");
  const enemiesRef = useRef<Enemy[]>(INITIAL_ENEMIES);
  const neobytesRef = useRef<Neobyte[]>(
    INITIAL_NEOBYTES.map((b) => ({ ...b })),
  );
  const hpRef = useRef(INITIAL_HP);
  const comboRef = useRef(0);
  const attackTimeoutRef = useRef<number | null>(null);
  const damageCooldownRef = useRef(0);
  const timerRef = useRef<number | null>(null);
  const cameraXRef = useRef(0);

  /** Idle ping-pong: 0 → 1 → 2 → 1 → 0 … */
  const animFrameRef = useRef(0);
  const animDirRef = useRef<1 | -1>(1);
  const lastAnimTimeRef = useRef(0);

  const resetCyanSpiritAnim = () => {
    animFrameRef.current = 0;
    animDirRef.current = 1;
    lastAnimTimeRef.current = 0;
    setAnimState({ frame: 0 });
  };

  const startAttack = () => {
    if (gameStateRef.current !== "playing") return;

    const current = playerRef.current;
    if (current.attacking) return;

    const attackingPlayer = { ...current, attacking: true };
    playerRef.current = attackingPlayer;
    setPlayer(attackingPlayer);

    if (attackTimeoutRef.current) {
      window.clearTimeout(attackTimeoutRef.current);
    }

    attackTimeoutRef.current = window.setTimeout(() => {
      const nextPlayer = {
        ...playerRef.current,
        attacking: false,
      };
      playerRef.current = nextPlayer;
      setPlayer(nextPlayer);
      attackTimeoutRef.current = null;
    }, ATTACK_MS);
  };

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  /* Preload idle frames */
  useEffect(() => {
    CYAN_SPIRIT_IDLE_FRAMES.forEach((src) => {
      const image = new Image();
      image.src = src;
    });
  }, []);

  const startGame = () => {
    const resetPlayer = { ...INITIAL_PLAYER };
    const resetEnemies = INITIAL_ENEMIES.map((enemy) => ({
      ...enemy,
      alive: true,
    }));
    const resetBytes = INITIAL_NEOBYTES.map((byte) => ({
      ...byte,
      collected: false,
    }));

    playerRef.current = resetPlayer;
    enemiesRef.current = resetEnemies;
    neobytesRef.current = resetBytes;
    hpRef.current = INITIAL_HP;
    comboRef.current = 0;
    cameraXRef.current = 0;
    damageCooldownRef.current = 0;
    keysRef.current.clear();

    if (attackTimeoutRef.current) {
      window.clearTimeout(attackTimeoutRef.current);
      attackTimeoutRef.current = null;
    }

    resetCyanSpiritAnim();

    setPlayer(resetPlayer);
    setEnemies(resetEnemies);
    setNeobytesState(resetBytes);
    setHp(INITIAL_HP);
    setScore(0);
    setNeobytes(0);
    setCombo(0);
    setMaxCombo(0);
    setElapsedTime(0);
    setCameraX(0);

    gameStateRef.current = "playing";
    setGameState("playing");
  };

  const returnToInitialNode = () => {
    const resetPlayer = { ...INITIAL_PLAYER };
    const resetEnemies = INITIAL_ENEMIES.map((enemy) => ({
      ...enemy,
      alive: true,
    }));
    const resetBytes = INITIAL_NEOBYTES.map((byte) => ({
      ...byte,
      collected: false,
    }));

    playerRef.current = resetPlayer;
    enemiesRef.current = resetEnemies;
    neobytesRef.current = resetBytes;
    hpRef.current = INITIAL_HP;
    comboRef.current = 0;
    cameraXRef.current = 0;
    damageCooldownRef.current = 0;
    keysRef.current.clear();

    if (attackTimeoutRef.current) {
      window.clearTimeout(attackTimeoutRef.current);
      attackTimeoutRef.current = null;
    }

    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }

    resetCyanSpiritAnim();

    setPlayer(resetPlayer);
    setEnemies(resetEnemies);
    setNeobytesState(resetBytes);
    setHp(INITIAL_HP);
    setScore(0);
    setNeobytes(0);
    setCombo(0);
    setMaxCombo(0);
    setElapsedTime(0);
    setCameraX(0);

    gameStateRef.current = "start";
    setGameState("start");
  };

  /* Timer */
  useEffect(() => {
    if (gameState !== "playing") {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = window.setInterval(() => {
      setElapsedTime((previous) => previous + 1);
    }, 1000);

    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [gameState]);

  /* Keyboard */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();

      if (
        [
          "arrowleft",
          "arrowright",
          "arrowup",
          "arrowdown",
          " ",
          "a",
          "d",
          "w",
          "s",
          "x",
          "j",
        ].includes(key)
      ) {
        event.preventDefault();
      }

      keysRef.current.add(key);

      if (gameStateRef.current !== "playing") return;

      if (key === " " || key === "x" || key === "j") {
        startAttack();
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      keysRef.current.delete(event.key.toLowerCase());
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  /* =========================================================
  MAIN GAME LOOP — free-float 4-direction
  ========================================================= */

  useEffect(() => {
    let animationFrame = 0;

    const updateGame = () => {
      if (gameStateRef.current !== "playing") {
        animationFrame = window.requestAnimationFrame(updateGame);
        return;
      }

      const keys = keysRef.current;
      const current = playerRef.current;

      let nextX = current.x;
      let nextY = current.y;
      let nextFacing = current.facing;

      const movingLeft =
        keys.has("arrowleft") || keys.has("a");
      const movingRight =
        keys.has("arrowright") || keys.has("d");
      const movingUp = keys.has("arrowup") || keys.has("w");
      const movingDown =
        keys.has("arrowdown") || keys.has("s");

      let dx = 0;
      let dy = 0;
      if (movingLeft) dx -= 1;
      if (movingRight) dx += 1;
      if (movingUp) dy -= 1;
      if (movingDown) dy += 1;

      /* Diagonal normalization — total speed stays MOVE_SPEED */
      if (dx !== 0 || dy !== 0) {
        const length = Math.hypot(dx, dy);
        dx = (dx / length) * MOVE_SPEED;
        dy = (dy / length) * MOVE_SPEED;
        nextX += dx;
        nextY += dy;
        if (dx < 0) nextFacing = "left";
        else if (dx > 0) nextFacing = "right";
      }

      /* World + float bounds */
      nextX = Math.max(20, Math.min(WORLD_WIDTH - PLAYER_WIDTH - 20, nextX));
      nextY = Math.max(
        CYAN_SPIRIT_MIN_Y,
        Math.min(CYAN_SPIRIT_MAX_Y, nextY),
      );

      /* Soft obstacle collision */
      let playerBox = {
        x: nextX,
        y: nextY,
        width: PLAYER_WIDTH,
        height: PLAYER_HEIGHT,
      };

      for (const obstacle of OBSTACLES) {
        if (intersects(playerBox, obstacle)) {
          const resolved = resolveObstacleOverlap(playerBox, obstacle);
          nextX = resolved.x;
          nextY = resolved.y;
          nextX = Math.max(
            20,
            Math.min(WORLD_WIDTH - PLAYER_WIDTH - 20, nextX),
          );
          nextY = Math.max(
            CYAN_SPIRIT_MIN_Y,
            Math.min(CYAN_SPIRIT_MAX_Y, nextY),
          );
          playerBox = {
            x: nextX,
            y: nextY,
            width: PLAYER_WIDTH,
            height: PLAYER_HEIGHT,
          };
        }
      }

      /* Combat */
      const attackRange = {
        x:
          nextFacing === "right"
            ? nextX + PLAYER_WIDTH
            : nextX - 48,
        y: nextY + 16,
        width: 48,
        height: 34,
      };

      if (current.attacking) {
        let defeatedEnemyId: number | null = null;

        enemiesRef.current = enemiesRef.current.map((enemy) => {
          if (!enemy.alive || defeatedEnemyId !== null) {
            return enemy;
          }

          const enemyBox = {
            x: enemy.x,
            y: enemy.y,
            width: enemy.width,
            height: enemy.height,
          };

          if (intersects(attackRange, enemyBox)) {
            defeatedEnemyId = enemy.id;
            return { ...enemy, alive: false };
          }

          return enemy;
        });

        if (defeatedEnemyId !== null) {
          const nextCombo = comboRef.current + 1;
          comboRef.current = nextCombo;
          setCombo(nextCombo);
          setMaxCombo((previous) => Math.max(previous, nextCombo));
          setScore((previous) => previous + 250 * Math.max(1, nextCombo));
          setEnemies([...enemiesRef.current]);
        }
      }

      /* Enemy contact damage */
      if (damageCooldownRef.current > 0) {
        damageCooldownRef.current -= 1;
      }

      if (damageCooldownRef.current <= 0) {
        const touchingEnemy = enemiesRef.current.some((enemy) => {
          if (!enemy.alive) return false;
          return intersects(playerBox, {
            x: enemy.x,
            y: enemy.y,
            width: enemy.width,
            height: enemy.height,
          });
        });

        if (touchingEnemy) {
          const nextHp = Math.max(0, hpRef.current - 1);
          hpRef.current = nextHp;
          setHp(nextHp);
          comboRef.current = 0;
          setCombo(0);
          damageCooldownRef.current = 60;
          nextX =
            nextFacing === "right" ? nextX - 18 : nextX + 18;
          nextX = Math.max(
            20,
            Math.min(WORLD_WIDTH - PLAYER_WIDTH - 20, nextX),
          );
          playerBox = {
            x: nextX,
            y: nextY,
            width: PLAYER_WIDTH,
            height: PLAYER_HEIGHT,
          };

          if (nextHp <= 0) {
            gameStateRef.current = "gameover";
            setGameState("gameover");
            keysRef.current.clear();
            resetCyanSpiritAnim();
          }
        }
      }

      /* Collect NeoBytes — mutate ref; setState only if collected */
      {
        let collectedSomething = false;
        const updated = neobytesRef.current.map((byte) => {
          if (byte.collected) return byte;

          const byteBox = {
            x: byte.x - 10,
            y: byte.y - 10,
            width: 20,
            height: 20,
          };

          if (intersects(playerBox, byteBox)) {
            collectedSomething = true;
            return { ...byte, collected: true };
          }

          return byte;
        });

        if (collectedSomething) {
          neobytesRef.current = updated;
          setNeobytesState(updated);

          const nextCombo = comboRef.current + 1;
          comboRef.current = nextCombo;
          setNeobytes((previous) => previous + 1);
          setCombo(nextCombo);
          setMaxCombo((previous) => Math.max(previous, nextCombo));
          setScore((previous) => previous + 100 * Math.max(1, nextCombo));
        }
      }

      /* Idle ping-pong animation: 0 → 1 → 2 → 1 → 0 … */
      {
        const now = performance.now();
        if (lastAnimTimeRef.current === 0) {
          lastAnimTimeRef.current = now;
        }

        if (now - lastAnimTimeRef.current >= IDLE_FRAME_MS) {
          lastAnimTimeRef.current = now;

          let nextFrame = animFrameRef.current + animDirRef.current;
          const last = CYAN_SPIRIT_IDLE_FRAMES.length - 1;

          if (nextFrame >= last) {
            nextFrame = last;
            animDirRef.current = -1;
          } else if (nextFrame <= 0) {
            nextFrame = 0;
            animDirRef.current = 1;
          }

          if (nextFrame !== animFrameRef.current) {
            animFrameRef.current = nextFrame;
            setAnimState({ frame: nextFrame });
          }
        }
      }

      /* Camera — setState only when changed */
      const viewportWidth = viewportRef.current?.clientWidth ?? 1000;
      const desiredCamera = nextX - viewportWidth * 0.42;
      const maxCamera = Math.max(0, WORLD_WIDTH - viewportWidth);
      const boundedCamera = Math.max(
        0,
        Math.min(desiredCamera, maxCamera),
      );

      if (boundedCamera !== cameraXRef.current) {
        cameraXRef.current = boundedCamera;
        setCameraX(boundedCamera);
      }

      /* Player — setState only when changed */
      const nextPlayer: PlayerState = {
        x: nextX,
        y: nextY,
        facing: nextFacing,
        attacking: current.attacking,
      };

      playerRef.current = nextPlayer;

      if (!playersEqual(current, nextPlayer)) {
        setPlayer(nextPlayer);
      }

      /* Finish */
      const finishLine = WORLD_WIDTH - 150;
      if (
        nextX >= finishLine &&
        gameStateRef.current === "playing"
      ) {
        gameStateRef.current = "complete";
        setGameState("complete");
        keysRef.current.clear();
        resetCyanSpiritAnim();
      }

      animationFrame = window.requestAnimationFrame(updateGame);
    };

    animationFrame = window.requestAnimationFrame(updateGame);

    return () => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  /* Passive score while moving on any axis */
  useEffect(() => {
    if (gameState !== "playing") return;

    const interval = window.setInterval(() => {
      const keys = keysRef.current;
      if (
        keys.has("arrowleft") ||
        keys.has("arrowright") ||
        keys.has("arrowup") ||
        keys.has("arrowdown") ||
        keys.has("a") ||
        keys.has("d") ||
        keys.has("w") ||
        keys.has("s")
      ) {
        setScore((previous) => previous + 1);
      }
    }, 1000);

    return () => window.clearInterval(interval);
  }, [gameState]);

  const holdKey = (key: string) => {
    if (gameStateRef.current !== "playing") return;
    keysRef.current.add(key);
  };

  const releaseKey = (key: string) => {
    keysRef.current.delete(key);
  };

  const triggerAttack = () => {
    startAttack();
  };

  const progress = Math.min(
    100,
    Math.round((player.x / (WORLD_WIDTH - PLAYER_WIDTH)) * 100),
  );

  const activeSprite =
    CYAN_SPIRIT_IDLE_FRAMES[
      animState.frame % CYAN_SPIRIT_IDLE_FRAMES.length
    ];

  return (
    <main className="min-h-screen bg-[#050914] px-3 py-4 text-cyan-100 sm:px-6 sm:py-6">
      <div className="mx-auto w-full max-w-[1200px]">
        {/* HEADER */}
        <header className="mb-3 flex items-center justify-between border-b border-cyan-500/20 pb-3">
          <div>
            <div className="text-[10px] uppercase tracking-[0.35em] text-cyan-400/70 sm:text-xs">
              VΣLOHE SYSTEM
            </div>
            <div className="mt-1 text-sm font-bold uppercase tracking-[0.25em] text-cyan-200">
              ARCADE NODE
            </div>
          </div>
          <div className="text-right text-[8px] uppercase tracking-[0.2em] text-cyan-500/40 sm:text-[9px]">
            <div>BUILD // 06</div>
            <div className="mt-1">AEG-001</div>
          </div>
        </header>

        {/* START SCREEN */}
        {gameState === "start" && (
          <section className="relative flex min-h-[560px] flex-col items-center justify-center overflow-hidden border border-cyan-500/20 bg-[#07101f]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,220,255,0.08),transparent_55%)]" />
            <div className="relative z-10 text-center">
              <div className="text-[9px] uppercase tracking-[0.5em] text-cyan-500/50">
                ARCHIVE NODE // AEG-001
              </div>
              <h1 className="mt-4 text-3xl font-black uppercase tracking-[0.15em] text-cyan-300 sm:text-5xl">
                CYAN SPIRIT
              </h1>
              <p className="mt-3 text-[9px] uppercase tracking-[0.3em] text-cyan-500/50">
                AETHERGRID ARCADE PROTOCOL
              </p>
              <p className="mt-2 text-[8px] uppercase tracking-[0.25em] text-cyan-500/40">
                FLOATING UNIT // AEG-001
              </p>
              <button
                type="button"
                onClick={startGame}
                className="mt-8 border border-cyan-400/50 bg-cyan-500/10 px-8 py-3 text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-200 transition hover:bg-cyan-400/20"
              >
                INITIALIZE
              </button>
            </div>
          </section>
        )}

        {/* GAME */}
        {gameState === "playing" && (
          <section
            ref={viewportRef}
            className="relative h-[560px] overflow-hidden border border-cyan-500/20 bg-[#060b16]"
          >
            <div
              className="absolute left-0 top-0 h-full"
              style={{
                width: `${WORLD_WIDTH}px`,
                transform: `translateX(-${cameraX}px)`,
              }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(0,200,255,0.10),transparent_45%)]" />
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(0,220,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,220,255,0.08) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />

              <div
                className="absolute left-0 border-t border-cyan-400/30 bg-[#091322]"
                style={{
                  top: `${FLOOR_Y}px`,
                  width: `${WORLD_WIDTH}px`,
                  height: `${WORLD_HEIGHT - FLOOR_Y}px`,
                }}
              />

              {PLATFORMS.map((platform) => (
                <div
                  key={platform.x}
                  className="absolute border border-cyan-400/30 bg-cyan-500/10 shadow-[0_0_15px_rgba(0,220,255,0.08)]"
                  style={{
                    left: `${platform.x}px`,
                    top: `${platform.y}px`,
                    width: `${platform.width}px`,
                    height: `${platform.height}px`,
                  }}
                />
              ))}

              {OBSTACLES.map((obstacle) => (
                <div
                  key={obstacle.id}
                  className="absolute border border-purple-400/30 bg-purple-500/10"
                  style={{
                    left: `${obstacle.x}px`,
                    top: `${obstacle.y}px`,
                    width: `${obstacle.width}px`,
                    height: `${obstacle.height}px`,
                  }}
                />
              ))}

              {neobytesState
                .filter((byte) => !byte.collected)
                .map((byte) => (
                  <div
                    key={byte.id}
                    className="absolute flex h-5 w-5 items-center justify-center rounded-full border border-cyan-200 bg-cyan-400/20 text-[7px] text-cyan-100 shadow-[0_0_14px_rgba(0,255,255,0.7)]"
                    style={{
                      left: `${byte.x - 10}px`,
                      top: `${byte.y - 10}px`,
                    }}
                  >
                    ◆
                  </div>
                ))}

              {enemies
                .filter((enemy) => enemy.alive)
                .map((enemy) => (
                  <div
                    key={enemy.id}
                    className="absolute border border-fuchsia-500/40 bg-fuchsia-500/10 shadow-[0_0_14px_rgba(255,0,200,0.15)]"
                    style={{
                      left: `${enemy.x}px`,
                      top: `${enemy.y}px`,
                      width: `${enemy.width}px`,
                      height: `${enemy.height}px`,
                    }}
                  >
                    <div className="absolute left-1/2 top-1/3 h-2 w-2 -translate-x-1/2 rounded-full bg-fuchsia-400 shadow-[0_0_8px_rgba(255,0,200,0.8)]" />
                  </div>
                ))}

              {/* CYAN SPIRIT */}
              <div
                className="absolute"
                style={{
                  left: `${player.x}px`,
                  top: `${player.y}px`,
                  width: `${PLAYER_WIDTH}px`,
                  height: `${PLAYER_HEIGHT}px`,
                }}
              >
                <div
                  className="absolute left-1/2 top-1/2 overflow-visible"
                  style={{
                    width: `${CYAN_SPIRIT_VISUAL_SIZE}px`,
                    height: `${CYAN_SPIRIT_VISUAL_SIZE}px`,
                    transform:
                      player.facing === "left"
                        ? "translate(-50%, -50%) scaleX(-1)"
                        : "translate(-50%, -50%) scaleX(1)",
                    transformOrigin: "center center",
                  }}
                >
                  <img
                    src={activeSprite}
                    alt="Cyan Spirit"
                    draggable={false}
                    className="pointer-events-none select-none"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      objectPosition: "center center",
                      imageRendering: "pixelated",
                    }}
                  />
                </div>

                <div className="pointer-events-none absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/5 blur-xl" />

                {player.attacking && (
                  <div
                    className="absolute top-5 h-5 w-10 border-y-2 border-cyan-300 bg-cyan-400/20 shadow-[0_0_20px_rgba(0,255,255,0.8)]"
                    style={{
                      left:
                        player.facing === "right"
                          ? `${PLAYER_WIDTH}px`
                          : "-40px",
                    }}
                  />
                )}
              </div>

              <div className="absolute right-20 top-[220px] text-center">
                <div className="text-[8px] uppercase tracking-[0.3em] text-purple-400/50">
                  ARCHIVE NODE
                </div>
                <div className="mx-auto mt-2 h-20 w-px bg-purple-400/30 shadow-[0_0_10px_rgba(180,80,255,0.3)]" />
              </div>
            </div>

            <div className="absolute left-3 top-3 z-50 text-[7px] uppercase tracking-[0.2em] text-cyan-500/35 sm:left-4 sm:top-4 sm:text-[8px]">
              <div>
                POSITION //{" "}
                {Math.round(player.x).toString().padStart(4, "0")}
              </div>
              <div className="mt-1">NODE // AEG-001</div>
            </div>

            <div className="absolute right-3 top-3 z-50 text-right text-[7px] uppercase tracking-[0.15em] text-cyan-500/40 sm:right-4 sm:top-4 sm:text-[8px]">
              <div>
                HP // {hp}/{INITIAL_HP}
              </div>
              <div className="mt-1">SCORE // {score}</div>
              <div className="mt-1">NEOBYTES // {neobytes}</div>
              <div className="mt-1">COMBO // x{combo}</div>
              <div className="mt-1">TIME // {formatTime(elapsedTime)}</div>
            </div>

            <div className="absolute bottom-3 left-3 z-50 hidden text-[7px] uppercase tracking-[0.18em] text-cyan-500/40 sm:bottom-4 sm:left-4 sm:block sm:text-[8px]">
              <div>MOVE // WASD + ARROWS</div>
              <div className="mt-1">ATTACK // SPACE</div>
            </div>

            <div className="absolute bottom-3 right-3 z-50 text-right text-[7px] uppercase tracking-[0.18em] text-cyan-500/30 sm:bottom-4 sm:right-4 sm:text-[8px]">
              <div>ARCHIVE PROGRESS</div>
              <div className="mt-1 text-cyan-400/50">{progress}%</div>
            </div>
          </section>
        )}

        {/* COMPLETE */}
        {gameState === "complete" && (
          <section className="relative flex min-h-[560px] flex-col items-center justify-center overflow-hidden border border-cyan-500/20 bg-[#07101f]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.12),transparent_55%)]" />
            <div className="relative z-10 text-center">
              <div className="text-[9px] uppercase tracking-[0.4em] text-cyan-400/60">
                ARCHIVE NODE // COMPLETE
              </div>
              <h1 className="mt-4 text-3xl font-black uppercase tracking-[0.15em] text-cyan-300 sm:text-5xl">
                MISSION COMPLETE
              </h1>
              <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-cyan-500/50">
                CYAN SPIRIT HAS REACHED THE NEXT NODE
              </p>
              <div className="mt-8 grid grid-cols-2 gap-3 text-left text-[9px] uppercase tracking-[0.15em]">
                <div className="border border-cyan-500/20 px-5 py-3">
                  <div className="text-cyan-500/40">SCORE</div>
                  <div className="mt-1 text-cyan-200">{score}</div>
                </div>
                <div className="border border-cyan-500/20 px-5 py-3">
                  <div className="text-cyan-500/40">TIME</div>
                  <div className="mt-1 text-cyan-200">
                    {formatTime(elapsedTime)}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={returnToInitialNode}
                className="mt-8 border border-cyan-400/50 bg-cyan-500/10 px-8 py-3 text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-200 transition hover:bg-cyan-400/20"
              >
                RETURN TO NODE
              </button>
            </div>
          </section>
        )}

        {/* GAME OVER */}
        {gameState === "gameover" && (
          <section className="relative flex min-h-[560px] flex-col items-center justify-center overflow-hidden border border-fuchsia-500/20 bg-[#100712]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,180,0.10),transparent_55%)]" />
            <div className="relative z-10 text-center">
              <div className="text-[9px] uppercase tracking-[0.4em] text-fuchsia-400/50">
                SYSTEM INTERRUPTION
              </div>
              <h1 className="mt-4 text-3xl font-black uppercase tracking-[0.15em] text-fuchsia-300 sm:text-5xl">
                CYAN SPIRIT OFFLINE
              </h1>
              <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-fuchsia-500/40">
                ARCHIVE CONNECTION LOST
              </p>
              <button
                type="button"
                onClick={startGame}
                className="mt-8 border border-fuchsia-400/40 bg-fuchsia-500/10 px-8 py-3 text-[10px] font-bold uppercase tracking-[0.3em] text-fuchsia-200 transition hover:bg-fuchsia-400/20"
              >
                REINITIALIZE
              </button>
            </div>
          </section>
        )}

        {/* MOBILE — 4 directions + ATTACK */}
        {gameState === "playing" && (
          <div className="mt-3 grid grid-cols-3 gap-2 sm:hidden">
            <div />
            <button
              type="button"
              onPointerDown={() => holdKey("arrowup")}
              onPointerUp={() => releaseKey("arrowup")}
              onPointerCancel={() => releaseKey("arrowup")}
              onPointerLeave={() => releaseKey("arrowup")}
              className="border border-cyan-500/30 bg-cyan-950/20 py-3 text-cyan-300 active:bg-cyan-500/20"
            >
              ↑
            </button>
            <div />

            <button
              type="button"
              onPointerDown={() => holdKey("arrowleft")}
              onPointerUp={() => releaseKey("arrowleft")}
              onPointerCancel={() => releaseKey("arrowleft")}
              onPointerLeave={() => releaseKey("arrowleft")}
              className="border border-cyan-500/30 bg-cyan-950/20 py-3 text-cyan-300 active:bg-cyan-500/20"
            >
              ←
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
              onPointerDown={() => holdKey("arrowright")}
              onPointerUp={() => releaseKey("arrowright")}
              onPointerCancel={() => releaseKey("arrowright")}
              onPointerLeave={() => releaseKey("arrowright")}
              className="border border-cyan-500/30 bg-cyan-950/20 py-3 text-cyan-300 active:bg-cyan-500/20"
            >
              →
            </button>

            <div />
            <button
              type="button"
              onPointerDown={() => holdKey("arrowdown")}
              onPointerUp={() => releaseKey("arrowdown")}
              onPointerCancel={() => releaseKey("arrowdown")}
              onPointerLeave={() => releaseKey("arrowdown")}
              className="border border-cyan-500/30 bg-cyan-950/20 py-3 text-cyan-300 active:bg-cyan-500/20"
            >
              ↓
            </button>
            <div />
          </div>
        )}

        <footer className="mt-3 flex items-center justify-between text-[7px] uppercase tracking-[0.2em] text-cyan-500/25 sm:text-[8px]">
          <span>ARCADE NODE // BUILD 06</span>
          <span>INPUT // ACTIVE</span>
        </footer>
      </div>
    </main>
  );
}
