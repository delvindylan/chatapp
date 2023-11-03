const express = require("express");

app.post("/login", authenticateUser, (req, res) => {
    const { username } = req.user;
    req.session.username = username;
    res.json({ message: "Erfolgreich angemeldet", username });
  });

  app.post("/logout", (req, res) => {
    req.session.destroy();
    res.json({ message: "Erfolgreich abgemeldet" });
  });

server.listen(port, () => {
    console.log(`Server läuft auf Port ${port}`);
  });