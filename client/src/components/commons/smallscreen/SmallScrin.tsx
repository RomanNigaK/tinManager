import React from "react";
import scss from "./Smallscreen.module.scss";
import logo from "@public/logo.png";
import about from "@public/about2.mp4";
export default function SmallScrin() {
  return (
    <div className={scss.smallscreen}>
      <div className={scss.logo}>
        <div>
          <img src={logo} alt="" />
          <h4>TinManager.ru</h4>
          <h5>Система управления цехом onLine</h5>
          <div className={scss.info}>
            <div className={scss.title}>
              Приложение TinManager в настоящее время не поддерживается
              мобильными устройствами
            </div>
            <div className={scss.title}>
              Вы можете ознакомиться с приложением посмотрев видео-обзор ниже
            </div>
          </div>
          <div className={scss.video}>
            <h4>Что такое TinManager?!</h4>
            <video controls width="300px" loop>
              <source src={about} type="video/mp4" />
            </video>
          </div>
          <div className={scss.contacts}>
            <div>По вопросам использования, предложения и пожелания </div>
            <h5>Напишите нам</h5>
            <h5>support@tinmanager.ru</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
