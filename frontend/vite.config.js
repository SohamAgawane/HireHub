export default {
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:5050",
          changeOrigin: true,
        },
        "/uploads": {
          target: "http://localhost:5050",
          changeOrigin: true,
        },
      },
    },
  };
  