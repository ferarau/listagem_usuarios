import React from "react";

function SuccessMessage({ mensagem }) {
  if (!mensagem) return null;

  return (
    <div className="feedback-message success-message">
      ✅ {mensagem}
    </div>
  );
}

export default SuccessMessage;