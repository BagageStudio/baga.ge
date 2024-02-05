<template>
    <div class="logo">
        <div class="pixel-line solo">
            <div class="pixel"></div>
        </div>
        <div class="pixel-line duo">
            <div class="pixel"></div>
            <div class="pixel"></div>
        </div>
        <div class="pixel-line trio">
            <div class="pixel"></div>
            <div class="pixel"></div>
            <div class="pixel"></div>
        </div>
        <div class="pixel-line duo">
            <div class="pixel"></div>
            <div class="pixel"></div>
        </div>
        <div class="pixel-line solo">
            <div class="pixel"></div>
        </div>
    </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 30px;
    height: 30px;
}
.pixel-line {
    display: flex;
    justify-content: space-between;
    height: 20%;

    &.solo {
        width: 20%;
        .pixel {
            width: 100%;
        }
    }
    &.duo {
        width: 60%;
        .pixel {
            width: 33.3333%;
        }
        .pixel:first-child {
            animation: pixel-duo-first-move 10s cubic-bezier(0.87, 0, 0.13, 1)
                infinite;
        }
        .pixel:last-child {
            animation: pixel-duo-last-move 10s cubic-bezier(0.87, 0, 0.13, 1)
                infinite;
        }
    }
    &.trio {
        width: 100%;
        .pixel {
            width: 20%;
        }
        .pixel:first-child {
            animation: pixel-trio-first-move 10s cubic-bezier(0.87, 0, 0.13, 1)
                infinite;
        }
        .pixel:last-child {
            animation: pixel-trio-last-move 10s cubic-bezier(0.87, 0, 0.13, 1)
                infinite;
        }
    }
}
.pixel {
    position: relative;
    height: 100%;
    transform-origin: 50% 50%;

    &::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: var(--color);
        transform-origin: 50% 50%;
        animation: pixel-scale 10s cubic-bezier(0.87, 0, 0.13, 1) infinite;
    }
}

@keyframes pixel-scale {
    0% {
        transform: scaleX(1);
    }
    80% {
        transform: scaleX(1);
    }
    90% {
        transform: scaleX(1.333333);
    }
    100% {
        transform: scaleX(1);
    }
}

@keyframes pixel-duo-first-move {
    0% {
        transform: translate(0);
    }
    80% {
        transform: translate(0);
    }
    100% {
        transform: translate(200%);
    }
}
@keyframes pixel-duo-last-move {
    0% {
        transform: translate(0);
    }
    80% {
        transform: translate(0);
    }
    100% {
        transform: translate(-200%);
    }
}
@keyframes pixel-trio-first-move {
    0% {
        transform: translate(0);
    }
    80% {
        transform: translate(0);
    }
    100% {
        transform: translate(400%);
    }
}
@keyframes pixel-trio-last-move {
    0% {
        transform: translate(0);
    }
    80% {
        transform: translate(0);
    }
    100% {
        transform: translate(-400%);
    }
}
</style>
