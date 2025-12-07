document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("messageForm");
  const responseMessage = document.getElementById("responseMessage");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !message) {
      responseMessage.textContent = "Harap isi semua kolom!";
      responseMessage.style.color = "red";
      return;
    }

    try {
      const res = await fetch("/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message })
      });

      const data = await res.json();

      if (data.success) {
        responseMessage.textContent = "Pesan berhasil dikirim!";
        responseMessage.style.color = "green";
        form.reset();
      } else {
        responseMessage.textContent = "Gagal mengirim pesan.";
        responseMessage.style.color = "red";
      }
    } catch (error) {
      console.error(error);
      responseMessage.textContent = "Terjadi kesalahan pada server.";
      responseMessage.style.color = "red";
    }
  });
});
