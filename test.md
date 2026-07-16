Цветовая палитра (обновлённая)
css:root {
  --color-accent-green:   #5aba3c;   /* основной зелёный */
  --color-accent-blue:    #4DAADB;   /* голубой — магистратура */
  --color-accent-purple:  #9B6DD6;   /* фиолетовый — аспирантура */

  --color-text-heading:   #333333;   /* заголовки */
  --color-text-body:      #444444;   /* параграфы */
  --color-text-muted:     #888888;   /* вторичный текст (коды 09.03.01) */

  --color-bg-page:        #ffffff;
  --color-bg-card:        #f5f5f5;

  --color-border:         #e0e0e0;   /* разделители в таблице */
}

Типографика
РольCSSEyebrow (метка секции)font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-text-heading) — звёздочка после текста зелёнаяHero H1font-size: clamp(48px, 8vw, 96px); font-weight: 900; text-transform: uppercase; color: #333; line-height: 1.0Акцентный подзаголовокfont-size: 18–20px; font-weight: 700; font-style: italic; color: var(--color-accent-green)Тело / вопросыfont-size: 16–17px; font-weight: 400; color: #444; line-height: 1.6Жирный CTA-текст (не кнопка)font-weight: 700; color: #333Код направления (09.03.01)font-size: 13px; color: var(--color-text-muted)Название программы в таблицеfont-size: 15–16px; font-weight: 700; color: #333

Компоненты
Декоративный * (hero-астериск)
Большой символ * — отдельный элемент верстки, не часть текста.
css.hero-asterisk {
  font-size: clamp(160px, 18vw, 240px);
  font-weight: 900;
  color: var(--color-accent-green);
  line-height: 1;
  user-select: none;
  position: absolute; /* или в flex-колонке справа */
}
Pill-бейдж категории (с заливкой)
Три варианта — под каждый уровень обучения:
css.pill {
  display: inline-block;
  padding: 6px 18px;
  border-radius: 100px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #fff;
}
.pill--green  { background: var(--color-accent-green); }
.pill--blue   { background: var(--color-accent-blue); }
.pill--purple { background: var(--color-accent-purple); }

Это отличие от карточек в первом скрине — там pill был outline/прозрачный, здесь — solid/заливка.

Секция-группа программ (с левой полосой)
css.program-group {
  border-left: 4px solid var(--color-accent-green); /* меняется по типу */
  padding-left: 24px;
  margin-bottom: 40px;
}
.program-group--blue   { border-color: var(--color-accent-blue); }
.program-group--purple { border-color: var(--color-accent-purple); }
Строка в таблице программ
css.program-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-top: 1px solid var(--color-border);
  padding: 20px 0;
}
Шапка группы (pill + код + направление)
html<div class="program-group-header">
  <span class="pill pill--green">Бакалавриат</span>
  <div class="program-group-meta">
    <span class="program-code">09.03.01</span>
    <span class="program-direction">Информатика и вычислительная техника</span>
  </div>
</div>
css.program-group-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 0;
}
.program-code {
  font-size: 13px;
  color: var(--color-text-muted);
}
.program-direction {
  font-size: 13px;
  color: var(--color-text-muted);
}

Паттерны секций
Hero:
[eyebrow uppercase черный + * зелёная]
[H1 огромный uppercase чёрный]          [* зелёный большой декор справа]
[подзаголовок жирный зелёный курсив]
[параграф обычный]
[жирный текст-призыв]
Таблица программ:
[левая цветная полоса 4px]
  [pill залитый] [код серый] [название направления серое]
  ─────────────────────────────────────────────
  [Название программы]    │  [Название программы]
  ─────────────────────────────────────────────
  [Название программы]    │  [Название программы]

Ключевые принципы системы

Акцент = цвет. Всё важное выделяется только цветом (зелёный/синий/фиолетовый), без теней и градиентов
Два типа pill: outline-зелёный (карточки) vs solid-цветной (категории)
Левая полоса = принадлежность к категории (цвет совпадает с pill)
Звёздочка * — сквозной графический мотив: в тексте (мелкая), как декор (огромная)
Никаких теней ни у чего — разделение через фон и border
