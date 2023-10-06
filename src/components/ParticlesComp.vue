<template>
  <div  class="particles">
    <Particles
        id="tsparticles"
        :particlesInit="particlesInit"
        :options="options"
    />
  </div>
</template>

<script setup >
import { loadFull } from "tsparticles";

const options = {
  background: {
    color: {
      value: '#F5F5F7'
    }
  },
  fullScreen: {
    enable: true,
    zIndex: -1
  },
  fpsLimit: 30,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: 'push'
      },
      onHover: {
        enable: true,
        mode: 'grab' // grab, repulse
      },
      resize: true
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40
      },
      push: {
        quantity: 2
      },
      repulse: {
        distance: 200,
        duration: 0.4
      }
    }
  },
  particles: {
    color: {
      value: '#339DFF'
    },
    links: {
      color: '#339DFF',
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1
    },
    collisions: {
      enable: true
    },
    move: {
      direction: 'none',
      enable: true,
      outMode: 'bounce',
      random: false,
      speed: 1,
      straight: false,
      maxSpeed: 1
    },
    number: {
      density: {
        enable: true,
        area: 800
      },
      value: 40
    },
    opacity: {
      value: 0.5
    },
    shape: {
      type: 'circle'
    },
    size: {
      random: true,
      value: 5
    }
  },
  detectRetina: true
}

const particlesInit = async engine => {
  await loadFull(engine);
};

</script>

<style lang="scss" scoped>

</style>