const deleteBtns = document.querySelectorAll(".delete-btn");
const mission = document.querySelector(".mission");
const missionAddBtn = document.querySelector(".mission-add-btn");
const input = document.querySelector(".input");
const ul = document.querySelector(".todo-list");
const modal = document.querySelector(".modal");
const failedModal = document.querySelector(".fail-modal");

const init = () => {
  const generateUniqueId = () => {
    return "id_" + Date.now(); // 현재 시간을 기반으로 하는 ID 생성
  };

  // 모달 핸들러.
  const toggleModal = (modal, text) => {
    const modalText = modal.querySelector(".modal-text");
    modalText.textContent = text;
    modal.classList.add("on");
    setTimeout(() => {
      modal.classList.remove("on");
    }, 1000);
  };

  const modalHandler = (isSuccess, text) => {
    if (isSuccess) {
      failedModal.classList.remove("on");
      toggleModal(modal, text);
    } else {
      modal.classList.remove("on");
      toggleModal(failedModal, text);
    }
  };

  // 미션 삭제.
  const deleteHandler = (e) => {
    const successText = "퀘스트 완료!";
    modalHandler(true, successText);

    const mission = e.target.parentNode.parentNode;
    mission.classList.add("deleted"); // 삭제되는 요소에 deleted 클래스 추가
    setTimeout(() => {
      mission.remove(); // 삭제 후 요소를 실제로 제거
    }, 300);
  };

  // 미션 추가.
  const addMissionHandler = (e) => {
    const newTodo = input.value;
    if (newTodo.length === 0) {
      const failedText = "텍스트를 입력해주세요.";
      modalHandler(false, failedText);
      return;
    }

    const newID = generateUniqueId();

    const newLi = document.createElement("li");
    newLi.classList.add("mission");

    const newH4 = document.createElement("h4");
    newH4.classList.add("mission-text");
    newH4.textContent = `• ${newTodo}`;

    const newCheckbox = document.createElement("input");
    newCheckbox.setAttribute("type", "checkbox");
    newCheckbox.classList.add("my-check-box");
    newCheckbox.id = newID;

    const newLabel = document.createElement("label");
    newLabel.classList.add("check-box");
    newLabel.setAttribute("for", newID);

    const newDeleteBtn = document.createElement("button");
    newDeleteBtn.classList.add("delete-btn");
    newDeleteBtn.textContent = "x";
    newDeleteBtn.addEventListener("click", deleteHandler);

    newLi.appendChild(newH4);

    const newBoxWrapDiv = document.createElement("div");
    newBoxWrapDiv.classList.add("box-wrap");
    newBoxWrapDiv.appendChild(newCheckbox);
    newBoxWrapDiv.appendChild(newLabel);
    newBoxWrapDiv.appendChild(newDeleteBtn);

    newLi.appendChild(newBoxWrapDiv);

    ul.insertBefore(newLi, ul.firstChild);

    const addText = "퀘스트 추가!";
    modalHandler(true, addText);
    input.value = "";
  };

  // 엔터확인
  const isEnter = (e) => {
    if (e.key === "Enter") {
      addMissionHandler();
    }
  };

  missionAddBtn.addEventListener("click", addMissionHandler);
  input.addEventListener("keydown", isEnter);
};

init();
