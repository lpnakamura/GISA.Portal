const PROXY_CONFIG = [
  {
      context: [
          "/v1",
          "/diagram.xml"
      ],
      target: "https://bwrjdgft98.execute-api.us-east-1.amazonaws.com",
      secure: true,      
      changeOrigin: true
  }
]

module.exports = PROXY_CONFIG;