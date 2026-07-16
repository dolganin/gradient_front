import { useEffect, useRef, useState } from 'react';
import heroImage from '../icons/7mbqDN3vaR7Fr4t5eNyQpvtx3GO3aaffnoMHUAd6.jpg';
import aboutImage2 from '../icons/2RX4SneyiDQcPJ049CuMacPVbzwQG9FfdBw7hWivUQEUAmgpWsl27Z8bLDAyw55i7mgg6m_mZ6p9ovDJ06NpqMs8.jpg';
import nsuLogo from '../icons/NSU_logo_Russian_Red.png';
import t1Logo from '../icons/84c15b93b00e46b5461ac8e57462b8db.jpg';
import iirLogo from '../icons/иир.png';
import brandIcon from '../icons/Grandient.ico';
import gradientLogo from '../icons/Untitled-100.svg';
import roverImage from '../icons/марсоход.png';
import soundImage from '../icons/звук.png';

const scheduleDays = [
  {
    day: 'День 1',
    date: '3 октября',
    theme: 'Открытие, доклады, обед, дневной блок и вечерняя активность',
    items: [
      {
        time: '10:00',
        title: 'Приветственное слово',
        text: 'Открываем конференцию, обозначаем рамку двух дней, правила площадки и общий регламент: один поток, без параллельных секций.',
      },
      {
        time: '10:30',
        title: 'Спикеры',
        text: 'Утренний блок докладов. Регламент доклада: 20 минут на выступление, короткие вопросы после блока и обсуждение в перерывах.',
      },
      {
        time: '13:00',
        title: 'Еда',
        text: 'Обеденный перерыв, восстановление сил, общение со спикерами и знакомство участников между собой.',
      },
      {
        time: '14:05',
        title: 'Спикеры',
        text: 'Дневной блок докладов. Сохраняем тот же регламент: 20 минут на доклад, без параллельных сессий и с общим вниманием зала.',
      },
      {
        time: '15:45',
        title: 'Активность',
        text: 'Интерактивный блок в ML-тематике: вопросы, кейсы, мемы индустрии и командная динамика после докладов.',
      },
      {
        time: '17:00',
        title: 'Свой движ',
        text: 'Свободная вечерняя часть: нетворкинг, продолжение разговоров, прогулка по Академгородку и неформальные встречи.',
      },
    ],
  },
  {
    day: 'День 2',
    date: '4 октября',
    theme: 'Второй день докладов, обед, практическая активность и свободный вечер',
    items: [
      {
        time: '10:00',
        title: 'Приветственное слово',
        text: 'Коротко собираем второй день, напоминаем регламент, фиксируем важные объявления и сразу переходим к программе.',
      },
      {
        time: '10:20',
        title: 'Спикеры',
        text: 'Утренний блок второго дня. Доклады идут по 20 минут, вопросы собираем после блока и в перерывах.',
      },
      {
        time: '13:00',
        title: 'Еда',
        text: 'Обеденный перерыв, обсуждение кейсов, вопросы спикерам и спокойное переключение перед дневной частью.',
      },
      {
        time: '14:00',
        title: 'Спикеры',
        text: 'Дневной блок докладов: практические кейсы, инфраструктура, данные, качество решений и эксплуатация ML-систем.',
      },
      {
        time: '15:20',
        title: 'Активность',
        text: 'Практический блок и разбор живых примеров. Формат предполагает участие зала и быстрый обмен опытом.',
      },
      {
        time: '17:00',
        title: 'Свой движ',
        text: 'Свободная вечерняя часть: продолжение дискуссий, личные встречи, планы на проекты и спокойный финал конференции.',
      },
    ],
  },
];


const goldPartners = [
  { name: 'Т1', image: t1Logo, alt: 'Логотип Т1' },
  { name: 'НГУ', image: nsuLogo, alt: 'Логотип НГУ' },
  { name: 'ИИР', image: iirLogo, alt: 'Логотип ИИР' },
];

const conferenceDates = [
  {
    status: 'active',
    title: 'Открытие регистрации',
    value: '15 июля 2026',
    note: 'Открываем набор участников конференции, спикеров и гостей хакатона.',
  },
  {
    status: 'upcoming',
    title: 'Публикация полной программы',
    value: '20 августа 2026',
    note: 'Раскрываем расписание, спикеров, треки и подробности двухдневной программы.',
  },
  {
    status: 'upcoming',
    title: 'Закрытие онлайн-регистрации',
    value: '1 октября 2026',
    note: 'Последний день, когда можно отправить заявку и подтвердить участие.',
  },
  {
    status: 'upcoming',
    title: 'Дни проведения Градиент',
    value: '3-4 октября 2026',
    note: 'Очная программа в НГУ: доклады, обсуждения, перерывы на общение и награждение победителей хакатона.',
  },
];

const hackathonDates = [
  {
    status: 'waiting',
    title: 'Анонс задач и старт сбора команд',
    value: '25 июля 2026',
    note: 'Открываем регистрацию на хакатон, публикуем направления задач. Команды до 3 человек.',
  },
  {
    status: 'upcoming',
    title: 'Закрытие приёма заявок',
    value: '12 сентября 2026',
    note: 'Фиксируем состав участников, подтверждаем команды и распределяем их по трекам.',
  },
  {
    status: 'upcoming',
    title: 'Хакатон',
    value: '25 сентября по 2 октября 2026',
    note: 'Команды работают над задачами своего трека. Финальные презентации пройдут 2 октября, за день до конференции.',
  },
  {
    status: 'upcoming',
    title: 'Награждение',
    value: '3 октября 2026',
    note: 'Награждение победителей пройдёт на открытии конференции Градиент. Лучшие решения покажем всем участникам.',
  },
];

const topics = [
  'Компьютерное зрение',
  'Обработка естественного языка и Большие Языковые Модели',
  'RAG и работа с внешними источниками знаний',
  'Агентные системы',
  'Прикладное обучение с подкреплением',
  'Временные ряды',
  'И многие другие',
];

const hackathonTracks = [
  {
    title: 'Старший трек',
    domain: 'Обучение с подкреплением',
    level: 'Для старших курсов и команд с уверенным ML-бэкграундом.',
    task: 'Нужны архитектурное решение, глубокий ресёрч и самостоятельная обработка данных. Командам предстоит выбрать подход, обосновать архитектуру, подготовить данные и довести решение до защищаемого результата.',
    difference: 'Фокус трека: исследование постановки, работа с качеством данных, валидация, инженерные решения и защита выбранной архитектуры в задаче обучения с подкреплением.',
  },
  {
    title: 'Младший трек',
    domain: 'Обработка звука',
    level: 'Для младших курсов и участников, которые только набирают практический опыт в ML.',
    task: 'Участники будут работать с задачей обработки звука, разбираться в данных, пробовать существующие решения и аккуратно модифицировать подход под условия трека.',
    difference: 'Фокус трека: практический запуск базовых решений, понятная обработка данных, сравнение подходов и интерпретация результата.',
  },
];

const nsuMapEmbed =
  'https://yandex.ru/map-widget/v1/?text=%D1%83%D0%BB.%20%D0%9F%D0%B8%D1%80%D0%BE%D0%B3%D0%BE%D0%B2%D0%B0%2C%203%2C%20%D0%9D%D0%BE%D0%B2%D0%BE%D1%81%D0%B8%D0%B1%D0%B8%D1%80%D1%81%D0%BA%2C%20%D0%90%D0%BA%D0%B0%D0%B4%D0%B5%D0%BC%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D0%BE%D0%BA&z=16';

const nsuMapLink =
  'https://yandex.ru/maps/?text=%D1%83%D0%BB.%20%D0%9F%D0%B8%D1%80%D0%BE%D0%B3%D0%BE%D0%B2%D0%B0%2C%203%2C%20%D0%9D%D0%BE%D0%B2%D0%BE%D1%81%D0%B8%D0%B1%D0%B8%D1%80%D1%81%D0%BA%2C%20%D0%90%D0%BA%D0%B0%D0%B4%D0%B5%D0%BC%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D0%BE%D0%BA';

export default function App() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState('idle');
  const [registrationMessage, setRegistrationMessage] = useState('');
  const [isHeaderCompact, setIsHeaderCompact] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [formParticipation, setFormParticipation] = useState('conference');
  const [formConferenceRole, setFormConferenceRole] = useState('listener');
  const [formTeamStatus, setFormTeamStatus] = useState('no_team');
  const [notification, setNotification] = useState(null);
  const notificationTimerRef = useRef(null);
  const isConferenceSelected = formParticipation === 'conference' || formParticipation === 'both';
  const isHackathonSelected = formParticipation === 'hackathon' || formParticipation === 'both';
  const isSpeakerSelected = isConferenceSelected && formConferenceRole === 'speaker';
  const requiresNsuAffiliation = isConferenceSelected && !isHackathonSelected && formConferenceRole === 'listener';
  const hasHackathonTeam = isHackathonSelected && formTeamStatus === 'has_team';

  useEffect(() => {
    const updateHeaderState = () => {
      const heroBlock = document.getElementById('hero');
      const heroHeight = heroBlock?.offsetHeight || window.innerHeight;
      setIsHeaderCompact(window.scrollY >= heroHeight - 96);
    };

    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState, { passive: true });
    window.addEventListener('resize', updateHeaderState);

    const closeMobileNavOnScroll = () => setIsMobileNavOpen(false);
    window.addEventListener('scroll', closeMobileNavOnScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateHeaderState);
      window.removeEventListener('resize', updateHeaderState);
      window.removeEventListener('scroll', closeMobileNavOnScroll);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (notificationTimerRef.current) {
        clearTimeout(notificationTimerRef.current);
      }
    };
  }, []);

  const showNotification = (message, type = 'success') => {
    if (notificationTimerRef.current) {
      clearTimeout(notificationTimerRef.current);
    }

    setNotification({ message, type });
    notificationTimerRef.current = setTimeout(() => {
      setNotification(null);
      notificationTimerRef.current = null;
    }, 5000);
  };

  const openRegistration = (participation = 'conference') => {
    const nextParticipation = ['conference', 'hackathon', 'both'].includes(participation)
      ? participation
      : 'conference';

    setRegistrationStatus('idle');
    setRegistrationMessage('');
    setFormParticipation(nextParticipation);
    setFormConferenceRole(nextParticipation === 'hackathon' ? 'none' : 'listener');
    setFormTeamStatus('no_team');
    setNotification(null);
    setIsRegisterOpen(true);
  };

  const closeRegistration = () => {
    setIsRegisterOpen(false);
  };

  const handleRegistrationSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setRegistrationStatus('loading');
    setRegistrationMessage('');

    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || 'Не удалось отправить заявку.');
      }

      form.reset();
      setFormParticipation('conference');
      setFormConferenceRole('listener');
      setFormTeamStatus('no_team');
      setRegistrationStatus('idle');
      setRegistrationMessage('');
      setIsRegisterOpen(false);
      showNotification('Заявка отправлена. Мы свяжемся с вами после обработки регистрации.');
    } catch (error) {
      setRegistrationStatus('error');
      setRegistrationMessage(error.message || 'Не удалось отправить заявку. Попробуйте позже.');
    }
  };

  return (
    <div className="tilda-page">
      <header className={`topbar${isHeaderCompact ? ' topbar--scrolled' : ''}${isMobileNavOpen ? ' topbar--menu-open' : ''}`}>
        <div className="t-container topbar-inner">
          <a className="brand" href="#hero" onClick={() => setIsMobileNavOpen(false)}>
            <img className="brand-icon" src={brandIcon} alt="" aria-hidden="true" />
            <img className="brand-logo" src={gradientLogo} alt="Градиент" />
          </a>
          <nav className="topnav" aria-label="Основная навигация">
            <a href="#about">О событии</a>
            <a href="#topics">Тематика</a>
            <a href="#program">Программа</a>
            <a href="#hackathon">Хакатон</a>
            <a href="#location">Локация</a>
          </nav>
          <button
            className={`hamburger-btn${isMobileNavOpen ? ' hamburger-btn--open' : ''}`}
            type="button"
            onClick={() => setIsMobileNavOpen((v) => !v)}
            aria-label={isMobileNavOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={isMobileNavOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {isMobileNavOpen ? (
        <div className="mobile-nav-overlay" role="dialog" aria-label="Мобильная навигация">
          <nav className="mobile-nav-links" aria-label="Основная навигация">
            <a href="#about" onClick={() => setIsMobileNavOpen(false)}>О событии</a>
            <a href="#topics" onClick={() => setIsMobileNavOpen(false)}>Тематика</a>
            <a href="#program" onClick={() => setIsMobileNavOpen(false)}>Программа</a>
            <a href="#hackathon" onClick={() => setIsMobileNavOpen(false)}>Хакатон</a>
            <a href="#location" onClick={() => setIsMobileNavOpen(false)}>Локация</a>
          </nav>
          <button
            className="btn btn-primary mobile-nav-cta"
            type="button"
            onClick={() => { setIsMobileNavOpen(false); openRegistration('conference'); }}
          >
            Принять участие
          </button>
        </div>
      ) : null}

      {isRegisterOpen ? (
        <div className="modal-backdrop" role="presentation" onMouseDown={closeRegistration}>
          <section
            className="registration-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="registration-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button className="modal-close" type="button" onClick={closeRegistration} aria-label="Закрыть форму">
              ×
            </button>
            <p className="section-kicker">Регистрация</p>
            <h2 id="registration-title">Заявка на участие</h2>
            <form className="registration-form" onSubmit={handleRegistrationSubmit}>
              <div className="form-row">
                <label>
                  <span className="field-label-text">
                    Фамилия
                    <span className="field-required">обязательно</span>
                  </span>
                  <input name="lastName" type="text" required autoComplete="family-name" />
                </label>
                <label>
                  <span className="field-label-text">
                    Имя
                    <span className="field-required">обязательно</span>
                  </span>
                  <input name="firstName" type="text" required autoComplete="given-name" />
                </label>
              </div>
              <label>
                <span className="field-label-text">
                  Email
                  <span className="field-required">обязательно</span>
                </span>
                <input name="email" type="email" required autoComplete="email" />
              </label>
              <label>
                <span className="field-label-text">
                  Хочу участвовать в
                  <span className="field-required">обязательно</span>
                </span>
                <select
                  name="participation"
                  value={formParticipation}
                  onChange={(e) => {
                    const nextParticipation = e.target.value;
                    setFormParticipation(nextParticipation);
                    setFormConferenceRole(nextParticipation === 'hackathon' ? 'none' : 'listener');
                    setFormTeamStatus('no_team');
                  }}
                  required
                >
                  <option value="conference">Конференции</option>
                  <option value="hackathon">Хакатоне</option>
                  <option value="both">Конференции и хакатоне</option>
                </select>
              </label>
              <div className="event-dates-note" aria-live="polite">
                {isConferenceSelected ? (
                  <p>
                    <span>Конференция</span>
                    3-4 октября 2026, НГУ
                  </p>
                ) : null}
                {isHackathonSelected ? (
                  <p>
                    <span>Хакатон</span>
                    25 сентября - 2 октября 2026, очно на площадке НГУ
                  </p>
                ) : null}
              </div>
              {isConferenceSelected ? (
                <>
                  <label>
                    <span className="field-label-text">
                      Формат участия в конференции
                      <span className="field-required">обязательно</span>
                    </span>
                    <select
                      name="conferenceRole"
                      value={formConferenceRole}
                      onChange={(e) => setFormConferenceRole(e.target.value)}
                      required
                    >
                      <option value="listener">Слушатель</option>
                      <option value="speaker">Хочу выступить с докладом</option>
                    </select>
                  </label>
                  {requiresNsuAffiliation ? (
                    <>
                      <p className="form-policy-note">
                        Участие слушателем без доклада доступно для участников, связанных с НГУ.
                      </p>
                      <label>
                        <span className="field-label-text">
                          Связь с НГУ
                          <span className="field-required">обязательно</span>
                        </span>
                        <select name="nsuAffiliation" defaultValue="" required>
                          <option value="" disabled>
                            Выберите вариант
                          </option>
                          <option value="nsu_student">Студент НГУ</option>
                          <option value="nsu_employee">Сотрудник НГУ</option>
                        </select>
                      </label>
                    </>
                  ) : null}
                  {isConferenceSelected && formConferenceRole === 'listener' && isHackathonSelected ? (
                    <p className="form-policy-note">
                      Для участников хакатона доступ к конференции подтверждается через хакатонную заявку.
                    </p>
                  ) : null}
                  {isSpeakerSelected ? (
                    <>
                      <div className="form-subsection">
                        <label>
                          <span className="field-label-text">
                            Компания или вуз
                            <span className="field-optional">необязательно</span>
                          </span>
                          <input name="company" type="text" autoComplete="organization" />
                        </label>
                        <label>
                          <span className="field-label-text">
                            Роль, должность или курс
                            <span className="field-optional">необязательно</span>
                          </span>
                          <input name="role" type="text" placeholder="ML engineer, researcher, студент 3 курса..." />
                        </label>
                      </div>
                      <label>
                        <span className="field-label-text">
                          Тема доклада
                          <span className="field-required">обязательно</span>
                        </span>
                        <input name="talkTitle" type="text" required placeholder="Короткое название доклада" />
                      </label>
                      <label>
                        <span className="field-label-text">
                          Краткое описание доклада
                          <span className="field-required">обязательно</span>
                        </span>
                        <textarea
                          name="talkAbstract"
                          rows="4"
                          required
                          placeholder="О чём доклад, какая практическая задача, данные, подход или выводы"
                        />
                      </label>
                    </>
                  ) : null}
                </>
              ) : null}
              {isHackathonSelected && (
                <>
                  {!isSpeakerSelected ? (
                    <div className="form-subsection">
                      <label>
                        <span className="field-label-text">
                          Компания или вуз
                          <span className="field-optional">необязательно</span>
                        </span>
                        <input name="company" type="text" autoComplete="organization" />
                      </label>
                      <label>
                        <span className="field-label-text">
                          Роль, должность или курс
                          <span className="field-optional">необязательно</span>
                        </span>
                        <input name="role" type="text" placeholder="ML engineer, researcher, студент 3 курса..." />
                      </label>
                    </div>
                  ) : null}
                  <label>
                    <span className="field-label-text">
                      Трек хакатона
                      <span className="field-required">обязательно</span>
                    </span>
                    <select name="hackathonTrack" defaultValue="junior" required>
                      <option value="junior">Младший трек: для младших курсов</option>
                      <option value="senior">Старший трек: для старших курсов</option>
                      <option value="unknown">Ещё не решил</option>
                    </select>
                  </label>
                  <div className="checkbox-group">
                    <span className="field-label-text">
                      Очное участие в НГУ
                      <span className="field-required">обязательно</span>
                    </span>
                    <label className="checkbox-field">
                      <input name="onsiteNsu" type="checkbox" value="yes" required />
                      <span>Да, буду очно в НГУ</span>
                    </label>
                  </div>
                  <label>
                    <span className="field-label-text">
                      Команда
                      <span className="field-required">обязательно</span>
                    </span>
                    <select
                      name="teamStatus"
                      value={formTeamStatus}
                      onChange={(e) => setFormTeamStatus(e.target.value)}
                      required
                    >
                      <option value="no_team">У меня нет команды</option>
                      <option value="has_team">У меня есть команда</option>
                    </select>
                  </label>
                  {hasHackathonTeam ? (
                    <label>
                      <span className="field-label-text">
                        Название команды
                        <span className="field-required">обязательно</span>
                      </span>
                      <input name="teamName" type="text" required placeholder="Например: Gradient Boosters" />
                      <span className="field-note">
                        Проверьте, чтобы все участники указали одинаковое название команды при подаче заявки.
                      </span>
                    </label>
                  ) : null}
                </>
              )}
              <button className="btn btn-primary" type="submit" disabled={registrationStatus === 'loading'}>
                {registrationStatus === 'loading' ? 'Отправляем...' : 'Отправить заявку'}
              </button>
              {registrationMessage ? (
                <p className={`form-message form-message--${registrationStatus}`}>{registrationMessage}</p>
              ) : null}
            </form>
          </section>
        </div>
      ) : null}

      {notification ? (
        <div className={`toast-notification toast-notification--${notification.type}`} role="status" aria-live="polite">
          {notification.message}
        </div>
      ) : null}


      <main>
        <section className="cover-block" id="hero">
          <div className="cover-media cover-media--hero">
            <img src={heroImage} alt="Площадка конференции" />
            <div className="t-container cover-overlay">
              <div className="cover-copy">
                <p className="cover-kicker">Практическая конференция по машинному обучению</p>
                <img className="cover-logo" src={gradientLogo} alt="Градиент" />
                <div className="cover-meta">
                  <span>3-4 октября 2026</span>
                  <span>Новосибирск</span>
                </div>
                <div className="cover-actions">
                  <button className="btn btn-primary cover-primary-cta" type="button" onClick={() => openRegistration('conference')}>
                    ПРИНЯТЬ УЧАСТИЕ
                  </button>
                </div>
              </div>
              <a className="scroll-cue" href="#about" aria-label="Прокрутить к следующему блоку">
                <span>листайте дальше</span>
                <span className="scroll-cue-arrow" aria-hidden="true">
                  ↓
                </span>
              </a>
            </div>
          </div>
        </section>

        <section className="section-block dates-band" id="dates">
          <div className="t-container">
            <div className="dates-card">
              <div className="section-head">
                <p className="section-kicker">Конференция</p>
                <h2>Важные даты</h2>
              </div>
              <div className="pipeline-groups">
                <section className="pipeline-group" aria-labelledby="conference-pipeline-title">
                  <div className="pipeline-group-head">
                    <h3 id="conference-pipeline-title">Пайплайн конференции</h3>
                  </div>
                  <div className="dates-pipeline dates-pipeline--horizontal">
                    {conferenceDates.map((item) => (
                      <article className={`pipeline-card pipeline-card--${item.status}`} key={item.title}>
                        <span className="pipeline-status">
                          {item.status === 'waiting' ? 'Ожидание' : item.status === 'active' ? 'Ждём...' : 'Дальше'}
                        </span>
                        <strong>{item.value}</strong>
                        <h4>{item.title}</h4>
                        <p>{item.note}</p>
                      </article>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>

        <section className="section-block" id="about">
          <div className="t-container info-grid">
            <div className="section-copy">
              <p className="section-kicker">О событии</p>
              <h2>Градиент объединяет инженеров, исследователей и энтузиастов, которые применяют машинное обучение для решения конкретных задач.</h2>
              <p>
                Компьютерное зрение, обработка естественного языка, рекомендательные системы, временные ряды.
                Области разные, инструмент один. Градиент лежит в основе почти каждого современного метода машинного
                обучения и позволяет нам решать задачи вне зависимости от домена.
              </p>
              <p>
                Нас интересуют все, кто работает над практическими ML-задачами: продуктом в компании,
                исследовательским прототипом или личным проектом. Два дня, один поток, 24 доклада без
                параллельных сессий: только общее пространство для честной дискуссии о том, как машинное
                обучение работает на практике.
              </p>
            </div>

            <div className="about-gallery">
              <figure className="about-media about-media--feature">
                <img src={aboutImage2} alt="Скульптура мыши с ДНК в Новосибирском Академгородке" />
              </figure>
            </div>
          </div>
        </section>

        <section className="quote-band mission-band" id="mission">
          <div className="t-container quote-wrap mission-wrap">
            <p className="section-kicker">Миссия</p>
            <p className="quote-text mission-quote">
              Объединить <span>практиков машинного обучения</span> и дать им площадку для{' '}
              <span>честного обмена опытом</span> в сердце одного из главных научных центров страны,{' '}
              <span>Новосибирском Академгородке</span>.
            </p>
          </div>
        </section>

        <section className="section-block topics-band" id="topics">
          <div className="t-container topics-layout">
            <div className="topics-head">
              <p className="section-kicker">Тематика</p>
              <h2>Конференция сугубо практическая: доклады ориентированы на применение машинного обучения в реальных задачах.</h2>
            </div>

            <div className="topic-cloud" aria-label="Основные темы докладов">
              {topics.map((item) => (
                <span className="topic-chip" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="section-block program-band" id="program" style={{ '--program-bg': `url(${heroImage})` }}>
          <div className="t-container">
            <div className="section-head">
              <p className="section-kicker">Программа</p>
              <h2>Таймлайн конференции</h2>
            </div>
            <div className="schedule-grid">
              {scheduleDays.map((day) => (
                <section className="schedule-day" key={day.day}>
                  <header className="schedule-day-head">
                    <p className="schedule-day-label">{day.day}</p>
                    <h3>{day.date}</h3>
                    <p className="schedule-day-theme">{day.theme}</p>
                  </header>
                  <div className="schedule-list">
                    {day.items.map((item) => (
                      <article className="schedule-row" key={`${day.day}-${item.time}-${item.title}`}>
                        <div className="schedule-time">{item.time}</div>
                        <div className="schedule-content">
                          <h4>{item.title}</h4>
                          <p>{item.text}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>
            <div className="section-action section-action--dark">
              <button className="btn btn-primary btn-section-cta" type="button" onClick={() => openRegistration('conference')}>
                Принять участие в конференции
              </button>
            </div>
          </div>
        </section>

        <section className="section-block" id="hackathon-dates">
          <div className="t-container">
            <div className="dates-card">
              <div className="section-head">
                <p className="section-kicker">Хакатон</p>
                <h2>Важные даты</h2>
              </div>
              <div className="pipeline-groups">
                <section className="pipeline-group" aria-labelledby="hackathon-pipeline-title">
                  <div className="pipeline-group-head">
                    <h3 id="hackathon-pipeline-title">Пайплайн хакатона</h3>
                  </div>
                  <div className="dates-pipeline dates-pipeline--horizontal">
                    {hackathonDates.map((item) => (
                      <article className={`pipeline-card pipeline-card--${item.status}`} key={item.title}>
                        <span className="pipeline-status">
                          {item.status === 'waiting' ? 'Ожидание' : item.status === 'active' ? 'Ждём...' : 'Дальше'}
                        </span>
                        <strong>{item.value}</strong>
                        <h4>{item.title}</h4>
                        <p>{item.note}</p>
                      </article>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>

        <section className="section-block section-surface" id="hackathon">
          <div className="t-container">
            <div className="section-head">
              <p className="section-kicker">Хакатон</p>
              <h2>Два трека по уровню подготовки: для младших и старших курсов.</h2>
            </div>
            <div className="track-grid">
              {hackathonTracks.map((track) => (
                <article className="track-card" key={track.title}>
                  <span>{track.title}</span>
                  <h3>{track.domain}</h3>
                  <p className="track-audience">{track.level}</p>
                  <p>{track.task}</p>
                  <p>{track.difference}</p>
                  {track.domain === 'Обучение с подкреплением' ? (
                    <figure className="track-media">
                      <img src={roverImage} alt="Марсоход для трека по обучению с подкреплением" />
                    </figure>
                  ) : null}
                  {track.domain === 'Обработка звука' ? (
                    <figure className="track-media">
                      <img src={soundImage} alt="Визуализация звука для трека по обработке звука" />
                    </figure>
                  ) : null}
                </article>
              ))}
            </div>
            <div className="hackathon-rules" aria-label="Правила участия в хакатоне">
              <p>Участие в хакатоне очное: команды работают на площадке НГУ.</p>
              <p>Размер команды: до 3 человек, оптимальный состав 2 человека.</p>
              <p>Команды выбирают трек по уровню подготовки: младший или старший, и получают задачу в своём домене.</p>
              <p>Награждение победителей пройдёт на открытии конференции Градиент.</p>
            </div>
            <div className="section-action">
              <button className="btn btn-primary btn-section-cta" type="button" onClick={() => openRegistration('hackathon')}>
                Принять участие в хакатоне
              </button>
            </div>
          </div>
        </section>

        <section className="section-block" id="partners">
          <div className="t-container">
            <div className="section-head">
              <p className="section-kicker">Партнёры</p>
              <h2>Наши главные партнёры</h2>
            </div>
            <div className="gold-grid gold-grid--standalone">
              {goldPartners.map((partner) => (
                <article className="gold-card" key={partner.name}>
                  <img src={partner.image} alt={partner.alt} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-block location-block" id="location">
          <div className="t-container">
            <div className="section-head location-head">
              <p className="section-kicker">Локация</p>
              <h2>Новосибирский Академгородок</h2>
            </div>

            <div className="location-grid">
              <article className="location-card">
                <span>Как добраться</span>
                <h3>До площадки</h3>
                <p>
                  Площадка: корпус НГУ на ул. Пирогова, 3, Новосибирский Академгородок.
                </p>
                <p>
                  На автобусе: маршруты 8, 15, 23, 60 до остановки «Университет», от неё 5 минут пешком до входа.
                </p>
                <p>
                  На такси: ехать около 35 до 40 минут из центра Новосибирска, забивать в навигатор «НГУ, Пирогова 3».
                </p>
                <p>
                  На машине: парковка доступна рядом с корпусом со стороны Пирогова.
                </p>
              </article>
              <article className="location-card">
                <span>Где поесть</span>
                <h3>Еда и кофе</h3>
                <p>
                  В Академгородке есть кофейни, столовые и кафе в пешей доступности от кампуса. В программе оставим
                  окна на обед и короткие перерывы, чтобы не приходилось выбирать между докладами и едой.
                </p>
              </article>
              <article className="location-card">
                <span>Что поделать</span>
                <h3>После докладов</h3>
                <p>
                  Рядом Морской проспект, кампус НГУ, научные институты и прогулочные маршруты Академгородка. Это
                  хороший район для спокойного нетворкинга после насыщенного дня.
                </p>
              </article>
            </div>

            <div className="map-card">
              <div className="map-frame">
                <iframe
                  title="Карта НГУ в Новосибирске"
                  src={nsuMapEmbed}
                  loading="lazy"
                  allowFullScreen
                />
              </div>
              <div className="map-caption">
                <strong>НГУ</strong>
                <span>Новосибирск, ул. Пирогова, 3</span>
                <a href={nsuMapLink} target="_blank" rel="noreferrer">
                  Открыть карту
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="t-container site-footer-inner">
          <div className="site-footer-contact">
            <p className="section-kicker">Свяжитесь с нами</p>
            <h2>Есть вопрос по участию, партнёрству или программе?</h2>
          </div>
          <a className="site-footer-email" href="mailto:gradient.conference@gmail.com">
            gradient.conference@gmail.com
          </a>
          <div className="site-footer-bottom">
            <span>Градиент 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
