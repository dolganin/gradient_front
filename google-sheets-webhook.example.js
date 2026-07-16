const SHEET_NAME = 'Registrations';
const SEND_CONFIRMATION_EMAIL = true;
const EMAIL_SENDER_NAME = 'Градиент';
const EMAIL_FROM_ALIAS = '';
const EMAIL_REPLY_TO = 'gradient.conference@gmail.com';
const EMAIL_SUBJECT = 'Заявка на конференцию Градиент получена';
const SITE_URL = '[сайт / страница конференции]';
const REGISTRATION_URL = '[ссылка]';
const HEADERS = [
  'createdAt',
  'id',
  'lastName',
  'firstName',
  'name',
  'email',
  'company',
  'role',
  'participation',
  'conferenceRole',
  'nsuAffiliation',
  'nsuDetails',
  'talkTitle',
  'talkAbstract',
  'hackathonTrack',
  'onsiteNsu',
  'teamStatus',
  'teamName',
];

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function ensureHeaders(sheet) {
  const currentHeaders = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  const hasActualHeaders = currentHeaders.join('\n') === HEADERS.join('\n');

  if (!hasActualHeaders) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  }
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getParticipationLabel(value) {
  const labels = {
    conference: 'конференция',
    hackathon: 'хакатон',
    both: 'конференция и хакатон',
  };

  return labels[value] || value || 'мероприятие';
}

function getConferenceRoleLabel(value) {
  const labels = {
    listener: 'слушатель',
    speaker: 'спикер',
    none: '',
  };

  return labels[value] || value || '';
}

function getHackathonTrackLabel(value) {
  const labels = {
    junior: 'младший трек',
    senior: 'старший трек',
    unknown: 'ещё не решил',
    none: '',
  };

  return labels[value] || value || '';
}

function hasMeaningfulValue(value) {
  const normalizedValue = String(value || '').trim().toLowerCase();
  return normalizedValue !== '' && normalizedValue !== 'none' && normalizedValue !== 'null' && normalizedValue !== 'undefined';
}

function shouldShowHackathonTrack(data, label) {
  return ['hackathon', 'both'].indexOf(data.participation) !== -1 && hasMeaningfulValue(label);
}

function shouldShowConferenceRole(data, label) {
  return ['conference', 'both'].indexOf(data.participation) !== -1 && hasMeaningfulValue(label);
}

function compactLines(lines) {
  return lines.filter((line) => line !== null && line !== undefined && line !== false).join('\n');
}

function formatHtmlLink(label, value) {
  const safeLabel = escapeHtml(label);
  const safeValue = escapeHtml(value);

  if (/^https?:\/\//.test(value)) {
    return `<p><strong>${safeLabel}:</strong> <a href="${safeValue}">${safeValue}</a></p>`;
  }

  return `<p><strong>${safeLabel}:</strong> ${safeValue}</p>`;
}

function buildConfirmationBody(data) {
  const fullName = data.name || [data.lastName, data.firstName].filter(Boolean).join(' ');
  const participation = getParticipationLabel(data.participation);
  const conferenceRole = getConferenceRoleLabel(data.conferenceRole);
  const hackathonTrack = getHackathonTrackLabel(data.hackathonTrack);

  return compactLines([
    `Здравствуйте${fullName ? `, ${fullName}` : ''}!`,
    '',
    'Мы получили вашу заявку на участие в конференции Градиент.',
    `Формат участия: ${participation}.`,
    shouldShowConferenceRole(data, conferenceRole) ? `Роль на конференции: ${conferenceRole}.` : null,
    hasMeaningfulValue(data.talkTitle) ? `Тема доклада: ${data.talkTitle}.` : null,
    shouldShowHackathonTrack(data, hackathonTrack) ? `Трек хакатона: ${hackathonTrack}.` : null,
    hasMeaningfulValue(data.teamName) ? `Команда: ${data.teamName}.` : null,
    '',
    'Организаторы проверят заявку и свяжутся с вами после обработки регистрации.',
    '',
    'С уважением,',
    'Организационный комитет конференции «Градиент»',
    '',
    `Email: ${EMAIL_REPLY_TO}`,
    `Сайт: ${SITE_URL}`,
    `Регистрация: ${REGISTRATION_URL}`,
  ]);
}

function buildConfirmationHtml(data) {
  const fullName = data.name || [data.lastName, data.firstName].filter(Boolean).join(' ');
  const participation = getParticipationLabel(data.participation);
  const conferenceRole = getConferenceRoleLabel(data.conferenceRole);
  const hackathonTrack = getHackathonTrackLabel(data.hackathonTrack);
  const details = compactLines([
    `<p><strong>Формат участия:</strong> ${escapeHtml(participation)}.</p>`,
    shouldShowConferenceRole(data, conferenceRole) ? `<p><strong>Роль на конференции:</strong> ${escapeHtml(conferenceRole)}.</p>` : null,
    hasMeaningfulValue(data.talkTitle) ? `<p><strong>Тема доклада:</strong> ${escapeHtml(data.talkTitle)}.</p>` : null,
    shouldShowHackathonTrack(data, hackathonTrack) ? `<p><strong>Трек хакатона:</strong> ${escapeHtml(hackathonTrack)}.</p>` : null,
    hasMeaningfulValue(data.teamName) ? `<p><strong>Команда:</strong> ${escapeHtml(data.teamName)}.</p>` : null,
  ]);

  return `
    <div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.55;color:#171717;">
      <p>Здравствуйте${fullName ? `, ${escapeHtml(fullName)}` : ''}!</p>
      <p>Мы получили вашу заявку на участие в конференции Градиент.</p>
      ${details}
      <p>Организаторы проверят заявку и свяжутся с вами после обработки регистрации.</p>
      <br>
      <p>С уважением,<br>Организационный комитет конференции «Градиент»</p>
      <p>
        <strong>Email:</strong> <a href="mailto:${escapeHtml(EMAIL_REPLY_TO)}">${escapeHtml(EMAIL_REPLY_TO)}</a>
      </p>
      ${formatHtmlLink('Сайт', SITE_URL)}
      ${formatHtmlLink('Регистрация', REGISTRATION_URL)}
    </div>
  `;
}

function getEmailOptions(data) {
  const options = {
    name: EMAIL_SENDER_NAME,
    htmlBody: buildConfirmationHtml(data),
  };

  if (EMAIL_REPLY_TO) {
    options.replyTo = EMAIL_REPLY_TO;
  }

  if (EMAIL_FROM_ALIAS) {
    const aliases = GmailApp.getAliases();

    if (aliases.indexOf(EMAIL_FROM_ALIAS) === -1) {
      throw new Error(`Email alias is not configured for this Gmail account: ${EMAIL_FROM_ALIAS}`);
    }

    options.from = EMAIL_FROM_ALIAS;
  }

  return options;
}

function sendConfirmationEmail(data) {
  if (!SEND_CONFIRMATION_EMAIL || !data.email) {
    return { sent: false, skipped: true };
  }

  GmailApp.sendEmail(
    data.email,
    EMAIL_SUBJECT,
    buildConfirmationBody(data),
    getEmailOptions(data),
  );

  return { sent: true };
}

function authorizeGmail() {
  const aliases = GmailApp.getAliases();

  GmailApp.sendEmail(
    EMAIL_REPLY_TO || Session.getActiveUser().getEmail(),
    'Градиент: тест доступа к Gmail',
    `Apps Script получил доступ к Gmail.\n\nДоступные alias:\n${aliases.join('\n') || 'Нет alias'}`,
    {
      name: EMAIL_SENDER_NAME,
      replyTo: EMAIL_REPLY_TO || undefined,
    },
  );

  return aliases;
}

function doGet() {
  return jsonResponse({ ok: true, service: 'gradient-google-sheets-webhook' });
}

function doPost(e) {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
    const data = JSON.parse(e.postData.contents || '{}');

    ensureHeaders(sheet);
    sheet.appendRow(HEADERS.map((key) => data[key] || ''));

    let email = { sent: false, skipped: true };

    try {
      email = sendConfirmationEmail(data);
    } catch (emailError) {
      email = {
        sent: false,
        error: String(emailError && emailError.message ? emailError.message : emailError),
      };
    }

    return jsonResponse({ ok: true, email });
  } catch (error) {
    return jsonResponse({
      ok: false,
      error: String(error && error.message ? error.message : error),
    });
  }
}
