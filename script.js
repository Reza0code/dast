const chatForm = document.getElementById("chatForm");
const questionInput = document.getElementById("questionInput");
const chatMessages = document.getElementById("chatMessages");

if (chatForm) {
  chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const question = questionInput.value.trim();
    if (!question) return;

    addMessage(question, "user-message");
    questionInput.value = "";

    addMessage("در حال پاسخ‌دادن...", "bot-message loading");

    try {
      const response = await fetch("https://dast-yari-chatbot.onrender.com/api/dastyari", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ question })
      });

      const data = await response.json();

      const loading = document.querySelector(".loading");
      if (loading) loading.remove();

      addMessage(data.answer || "پاسخی دریافت نشد.", "bot-message");
    } catch (error) {
      const loading = document.querySelector(".loading");
      if (loading) loading.remove();

      addMessage("خطا در اتصال به دست‌یاری AI. لطفاً چند لحظه بعد دوباره تلاش کنید.", "bot-message");
    }
  });
}

function addMessage(text, className) {
  const div = document.createElement("div");
  div.className = className;
  div.textContent = text;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
