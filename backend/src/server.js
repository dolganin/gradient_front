import express from 'express';
import { randomUUID } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const loadEnvFile = (filePath) => {
  if (!existsSync(filePath)) {
    return;
  }

  const lines = readFileSync(filePath, 'utf8').split(/\r?\n/);

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine.startsWith('#')) {
      continue;
    }

    const separatorIndex = trimmedLine.indexOf('=');

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmedLine.slice(0, separatorIndex).trim();
    const rawValue = trimmedLine.slice(separatorIndex + 1).trim();
    const value = rawValue.replace(/^['"]|['"]$/g, '');

    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
};

const currentDir = dirname(fileURLToPath(import.meta.url));
loadEnvFile(resolve(currentDir, '../../.env'));
loadEnvFile(resolve(currentDir, '../.env'));

const app = express();
const port = Number(process.env.PORT || 4253);
const googleSheetsWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL || '';

const registrations = [];

const truncateText = (value, maxLength = 500) => {
  const text = String(value ?? '');
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

const cleanString = (value) => String(value ?? '').trim();

const conference = {
  name: 'Градиент',
  year: 2026,
  location: {
    city: 'Новосибирск',
    venue: 'НГУ',
    address: 'ул. Пирогова, 1',
  },
  dates: {
    start: '2026-10-03',
    end: '2026-10-04',
  },
  tracks: [
    'Компьютерное зрение',
    'NLP и Большие Языковые Модели',
    'RAG и внешние источники знаний',
    'Агентные системы',
    'Прикладное обучение с подкреплением',
    'Временные ряды',
    'Production ML',
  ],
};

const routes = [
  { method: 'GET', path: '/api/health', description: 'Проверка состояния backend-сервиса' },
  { method: 'GET', path: '/api/routes', description: 'Список доступных API-маршрутов' },
  { method: 'GET', path: '/api/conference', description: 'Базовая информация о конференции' },
  { method: 'POST', path: '/api/registrations', description: 'Черновой маршрут регистрации участника' },
];

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.CORS_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
    return;
  }

  next();
});

app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    service: 'gradient-backend',
    sheetsWebhookConfigured: Boolean(googleSheetsWebhookUrl),
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/routes', (req, res) => {
  res.json({ routes });
});

app.get('/api/conference', (req, res) => {
  res.json(conference);
});

app.post('/api/registrations', async (req, res) => {
  const {
    firstName = '',
    lastName = '',
    name = '',
    email,
    company = '',
    role = '',
    participation = 'conference',
    conferenceRole = '',
    nsuAffiliation = '',
    nsuDetails = '',
    talkTitle = '',
    talkAbstract = '',
    hackathonTrack = 'none',
    onsiteNsu = '',
    teamStatus = '',
    teamName = '',
  } = req.body ?? {};

  const firstNameValue = cleanString(firstName);
  const lastNameValue = cleanString(lastName);
  const fallbackNameValue = cleanString(name);
  const fullName = [lastNameValue, firstNameValue].filter(Boolean).join(' ') || fallbackNameValue;
  const emailValue = cleanString(email);
  const participationValue = cleanString(participation) || 'conference';
  const isConferenceRegistration = participationValue === 'conference' || participationValue === 'both';
  const isHackathonRegistration = participationValue === 'hackathon' || participationValue === 'both';
  const conferenceRoleValue = isConferenceRegistration ? cleanString(conferenceRole) || 'listener' : 'none';
  const nsuAffiliationValue = conferenceRoleValue === 'listener' && !isHackathonRegistration
    ? cleanString(nsuAffiliation)
    : '';
  const nsuDetailsValue = conferenceRoleValue === 'listener' && !isHackathonRegistration
    ? cleanString(nsuDetails)
    : '';
  const talkTitleValue = conferenceRoleValue === 'speaker' ? cleanString(talkTitle) : '';
  const talkAbstractValue = conferenceRoleValue === 'speaker' ? cleanString(talkAbstract) : '';
  const teamStatusValue = isHackathonRegistration ? cleanString(teamStatus) || 'no_team' : '';
  const teamNameValue = teamStatusValue === 'has_team' ? cleanString(teamName) : '';

  if (!fullName || !emailValue) {
    res.status(400).json({
      error: 'name_and_email_required',
      message: 'Для регистрации нужны фамилия, имя и email.',
    });
    return;
  }

  if (!['conference', 'hackathon', 'both'].includes(participationValue)) {
    res.status(400).json({
      error: 'invalid_participation',
      message: 'Выберите корректный формат участия.',
    });
    return;
  }

  if (isConferenceRegistration && !['listener', 'speaker'].includes(conferenceRoleValue)) {
    res.status(400).json({
      error: 'invalid_conference_role',
      message: 'Выберите формат участия в конференции.',
    });
    return;
  }

  if (conferenceRoleValue === 'listener' && !isHackathonRegistration && !nsuAffiliationValue) {
    res.status(400).json({
      error: 'nsu_affiliation_required',
      message: 'Для участия слушателем без доклада нужна связь с НГУ.',
    });
    return;
  }

  if (
    conferenceRoleValue === 'listener'
    && !isHackathonRegistration
    && !['nsu_student', 'nsu_employee'].includes(nsuAffiliationValue)
  ) {
    res.status(400).json({
      error: 'invalid_nsu_affiliation',
      message: 'Для участия слушателем выберите статус студента или сотрудника НГУ.',
    });
    return;
  }

  if (conferenceRoleValue === 'speaker' && !talkTitleValue) {
    res.status(400).json({
      error: 'talk_title_required',
      message: 'Для заявки на доклад укажите тему доклада.',
    });
    return;
  }

  if (conferenceRoleValue === 'speaker' && !talkAbstractValue) {
    res.status(400).json({
      error: 'talk_abstract_required',
      message: 'Для заявки на доклад добавьте краткое описание.',
    });
    return;
  }

  if (isHackathonRegistration && !cleanString(onsiteNsu)) {
    res.status(400).json({
      error: 'onsite_nsu_required',
      message: 'Для хакатона нужно подтвердить очное участие в НГУ.',
    });
    return;
  }

  if (isHackathonRegistration && !['no_team', 'has_team'].includes(teamStatusValue)) {
    res.status(400).json({
      error: 'invalid_team_status',
      message: 'Выберите корректный статус команды.',
    });
    return;
  }

  if (isHackathonRegistration && teamStatusValue === 'has_team' && !teamNameValue) {
    res.status(400).json({
      error: 'team_name_required',
      message: 'Если команда уже есть, укажите название команды.',
    });
    return;
  }

  const registration = {
    id: randomUUID(),
    firstName: firstNameValue,
    lastName: lastNameValue,
    name: fullName,
    email: emailValue,
    company: cleanString(company),
    role: cleanString(role),
    participation: participationValue,
    conferenceRole: isConferenceRegistration ? conferenceRoleValue : '',
    nsuAffiliation: nsuAffiliationValue,
    nsuDetails: nsuDetailsValue,
    talkTitle: talkTitleValue,
    talkAbstract: talkAbstractValue,
    hackathonTrack: isHackathonRegistration ? cleanString(hackathonTrack) || 'unknown' : '',
    onsiteNsu: isHackathonRegistration ? cleanString(onsiteNsu) : '',
    teamStatus: teamStatusValue,
    teamName: teamNameValue,
    createdAt: new Date().toISOString(),
  };

  registrations.push(registration);

  console.log(
    `[registration] received id=${registration.id} email=${registration.email} participation=${registration.participation}`,
  );

  if (!googleSheetsWebhookUrl) {
    console.error('[registration] Google Sheets webhook is not configured');
    res.status(503).json({
      error: 'sheets_not_configured',
      message: 'Google Sheets webhook не настроен на backend.',
    });
    return;
  }

  let confirmationEmail = null;

  try {
    const sheetsResponse = await fetch(googleSheetsWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registration),
    });

    const sheetsText = await sheetsResponse.text();
    let sheetsResult = null;

    try {
      sheetsResult = JSON.parse(sheetsText);
    } catch {
      // Google returns HTML for permission/deployment mistakes. Treat that as a failed sync.
    }

    if (!sheetsResponse.ok || sheetsResult?.ok !== true) {
      console.error('[registration] Google Sheets sync failed', {
        status: sheetsResponse.status,
        statusText: sheetsResponse.statusText,
        body: truncateText(sheetsText),
      });

      res.status(502).json({
        error: 'sheets_sync_failed',
        message: 'Заявка принята backend, но не записалась в Google Sheets. Проверь webhook и доступы.',
        sheetsStatus: sheetsResponse.status,
      });
      return;
    }

    console.log(`[registration] synced to Google Sheets id=${registration.id}`);
    confirmationEmail = sheetsResult.email || null;

    if (confirmationEmail?.sent) {
      console.log(`[registration] confirmation email sent id=${registration.id} email=${registration.email}`);
    } else if (confirmationEmail?.error) {
      console.error('[registration] confirmation email failed', {
        id: registration.id,
        email: registration.email,
        error: confirmationEmail.error,
      });
    } else if (confirmationEmail?.skipped) {
      console.warn('[registration] confirmation email skipped', {
        id: registration.id,
        email: registration.email,
      });
    } else {
      console.warn('[registration] confirmation email status is missing', {
        id: registration.id,
        email: registration.email,
        sheetsResult,
      });
    }
  } catch (error) {
    console.error('[registration] Google Sheets request failed', error);
    res.status(502).json({
      error: 'sheets_request_failed',
      message: 'Backend не смог отправить заявку в Google Sheets.',
    });
    return;
  }

  res.status(201).json({
    registration,
    sheetsSync: 'ok',
    confirmationEmail,
    total: registrations.length,
  });
});

app.use((req, res) => {
  res.status(404).json({
    error: 'not_found',
    message: `Маршрут ${req.method} ${req.path} не найден.`,
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Gradient backend listening on http://0.0.0.0:${port}`);
  console.log(`Google Sheets webhook configured: ${googleSheetsWebhookUrl ? 'yes' : 'no'}`);
});
