"use client";

import { useState } from "react";
import style from "./shareBtn.module.css";
import ShareModal from "./shareModal";

export default function ShareBtn() {
  const [shareModal, setShareModal] = useState(false);

  const openModal = () => {
    setShareModal(true);
  };

  const closeModal = () => {
    setShareModal(false);
  };

  return (
    <>
      <button className={style.btnOption} onClick={openModal}>
        공유하기
      </button>
      {shareModal && <ShareModal onClose={closeModal} />}
    </>
  );
}
