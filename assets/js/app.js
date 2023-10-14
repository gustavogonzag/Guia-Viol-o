new Vue({
  el: "#app",
  data: {
    css: "",
  },
  methods: {
    handleClick() {
      const token = localStorage.getItem("token");

      if (!token) {
        // window.location.href = "/login";
        alert('Você não possui token')
      }

      this.$nextTick(async () => {
        var stylesheets = document.styleSheets;

        for (var i = 0; i < stylesheets.length; i++) {
          var stylesheet = stylesheets[i];

          var rules = stylesheet.cssRules;

          for (var j = 0; j < rules.length; j++) {
            var rule = rules[j];

            this.css += rule.cssText;
          }
        }
        const obj = {
          css: "olá",
        };
        const config = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(obj),
        };
        console.log(config);
        const response = await fetch(
          "https://color-harmony-api.vercel.app/optimizations/style",
          config
        );
        const data = await response.json();
        console.log(data);
      });
    },
  },
});
