module.exports = {
    // ... other configuration
    resolve: {
      fallback: {
        "path": require.resolve("path-browserify"),
        "fs": require.resolve("fs-extra")
      }
    }
  };