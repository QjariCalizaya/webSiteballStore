import React from "react";
import "../styles/projectPage.css";

const TOTAL_WEEKS = 44;

const tasks = [
  { name: "Планирование и дизайн", start: 1,  duration: 4 },
  { name: "Инфраструктура (DevOps)", start: 5, duration: 6 },
  { name: "Backend — API и бизнес-логика", start: 11, duration: 14 },
  { name: "Frontend — UI/UX", start: 11, duration: 14 },
  { name: "Система склада / инвентаризация", start: 18, duration: 8 },
  { name: "Платформа delivery / tracking", start: 25, duration: 12 },
  { name: "QA и тестирование", start: 37, duration: 6 },
  { name: "Финальный деплой", start: 43, duration: 2, milestone: true },
];

function Gantt() {
  return (
    <div className="gantt">
      <div className="gantt-header">
        <div className="gantt-col task">Этап</div>
        <div className="gantt-col timeline">
          <div className="scale">
            {Array.from({ length: TOTAL_WEEKS }, (_, i) => (
              <div key={i} className={`tick ${((i + 1) % 4 === 0) ? "tick-major" : ""}`}>
                {((i + 1) % 4 === 0) ? `W${i + 1}` : ""}
              </div>
            ))}
          </div>
        </div>
      </div>

      {tasks.map((t, idx) => {
        const end = t.start + t.duration - 1;
        return (
          <div className="gantt-row" key={idx}>
            <div className="gantt-col task">{t.name}</div>
            <div className="gantt-col timeline">
              <div className="bars">
                <div
                  className={`bar ${t.milestone ? "bar-milestone" : ""}`}
                  style={{
                    gridColumnStart: t.start,
                    gridColumnEnd: end + 1
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function ProjectPage() {
  return (
    <div className="project-page">
      <button className="back-btn" onClick={() => window.history.back()}>
        ← Назад
      </button>

      <header className="project-hero">
        <h1>Проект «МойМяч»</h1>
        <p className="subtitle">
          Интернет-сайт для покупки лучших мячей из других стран
        </p>
      </header>

      <section className="card">
        <h2>Цель</h2>
        <p>
          Обеспечить удобную покупку товаров и доставку по всей Москве и России.
        </p>

        <h2>Задачи</h2>
        <ul>
          <li>Полная система работы и безопасности</li>
          <li>Интернет-сайт (Frontend)</li>
          <li>API, база данных, сервер (Backend)</li>
          <li>Приложения для курьеров</li>
          <li>Приложения для склада</li>
        </ul>
      </section>

      <section className="card">
        <h2>Целевая аудитория</h2>
        <div className="img-grid">
          <figure className="img-box">
            <img src="/intereses.png" alt="Целевая аудитория" className="real-img" />
            <figcaption>Целевая аудитория</figcaption>
          </figure>

          <figure className="img-box">
            <img src="/deportes.png" alt="Распределение" className="real-img" />
            <figcaption>Распределение аудитории</figcaption>
          </figure>
        </div>
      </section>

      <section className="card">
        <h2>Техностек</h2>
        <ul className="stack">
          <li><strong>Frontend:</strong> React / Next.js</li>
          <li><strong>Backend:</strong> Node.js (Express / NestJS)</li>
          <li><strong>База данных:</strong> PostgreSQL</li>
          <li><strong>DevOps:</strong> Linux / VPS / AWS / GCP</li>
          <li><strong>Mobile:</strong> React Native / Flutter</li>
        </ul>
      </section>

      <section className="card">
        <h2>Временная диаграмма</h2>
        <Gantt />
      </section>

      <section className="card">
        <h2>Диаграммы</h2>
        <div className="img-grid">
          <figure className="img-box">
            <img src="/diagramaClases.png" className="real-img" />
            <figcaption>Диаграмма классов</figcaption>
          </figure>
          <figure className="img-box">
            <img src="/diagramaComponentes.png" className="real-img" />
            <figcaption>Диаграмма компонентов</figcaption>
          </figure>
        </div>
      </section>
    </div>
  );
}
