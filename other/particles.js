export const particlesSettings = {
    background: {
        color: {
            value: "#000",
        },
    },
    fpsLimit: 120,
    interactivity: {
        events: {
            onClick: {
                enable: false,
                mode: "push",
            },
            onHover: {
                enable: false,
                mode: "repulse",
            },
            resize: true,
        },
        modes: {
            push: {
                quantity: 4,
            },
            repulse: {
                distance: 200,
                duration: 0.4,
            },
        },
    },
    particles: {
        move: {
            directions: "none",
            enable: true,
            outModes: {
                default: "bounce",
            },
            random: false,
            speed: {
                value: { min: 0.01, max: 0.4 },
            },
            straight: false,
        },
        number: {
            density: {
                enable: true,
                area: 800,
            },
            value: 20,
        },
        opacity: {
            value: 0.5,
        },
        shape: {
            type: "circle",
        },
        size: {
            value: { min: 1, max: 2 },
        },
    },
    detectRetina: true,
    preset: "fire",
}