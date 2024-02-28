module.exports = {
    apps: [{
      name: "PlanExec",
      script: "index.js",
      instances: "max",
      exec_mode: "cluster",
      error_file: "./logs/PlanExec_error.log",
      out_file: "./logs/PlanExec_output.log",
      log_file: "./logs/PlanExec_combined.log",
      merge_logs: true,
      autorestart: false,
      env: {
        NODE_ENV: "development",
        PORT: 3000 
      },
      env_production: {
        PORT: 3000,
         
      }
    }]
  }
  