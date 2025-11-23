import { MoodDefinition, MoodType, Language } from './types';

export const MOODS: Record<MoodType, MoodDefinition> = {
  [MoodType.FOCUS]: {
    id: MoodType.FOCUS,
    label: '集中',
    labelEn: 'Focus',
    description: '深い集中と没頭',
    descriptionEn: 'Deep concentration & flow',
    colorHex: '#3b82f6', // blue-500
    bgClass: 'bg-blue-600',
    textClass: 'text-blue-100',
    ringClass: 'ring-blue-400'
  },
  [MoodType.EXCITEMENT]: {
    id: MoodType.EXCITEMENT,
    label: '高揚',
    labelEn: 'Excited',
    description: 'エネルギーと期待感',
    descriptionEn: 'High energy & anticipation',
    colorHex: '#f59e0b', // amber-500
    bgClass: 'bg-amber-500',
    textClass: 'text-amber-100',
    ringClass: 'ring-amber-300'
  },
  [MoodType.CALM]: {
    id: MoodType.CALM,
    label: '平穏',
    labelEn: 'Calm',
    description: '安らぎとバランス',
    descriptionEn: 'Peace & balance',
    colorHex: '#10b981', // emerald-500
    bgClass: 'bg-emerald-600',
    textClass: 'text-emerald-100',
    ringClass: 'ring-emerald-400'
  },
  [MoodType.JOY]: {
    id: MoodType.JOY,
    label: '喜び',
    labelEn: 'Joy',
    description: '幸福感と楽しみ',
    descriptionEn: 'Happiness & delight',
    colorHex: '#ec4899', // pink-500
    bgClass: 'bg-pink-500',
    textClass: 'text-pink-100',
    ringClass: 'ring-pink-300'
  },
  [MoodType.FATIGUE]: {
    id: MoodType.FATIGUE,
    label: '疲労',
    labelEn: 'Fatigue',
    description: 'エネルギー不足、疲れ',
    descriptionEn: 'Low energy & tiredness',
    colorHex: '#64748b', // slate-500
    bgClass: 'bg-slate-600',
    textClass: 'text-slate-200',
    ringClass: 'ring-slate-400'
  },
  [MoodType.ANXIETY]: {
    id: MoodType.ANXIETY,
    label: '不安',
    labelEn: 'Anxiety',
    description: '緊張や心配',
    descriptionEn: 'Tension & worry',
    colorHex: '#7c3aed', // violet-600
    bgClass: 'bg-violet-700',
    textClass: 'text-violet-100',
    ringClass: 'ring-violet-400'
  },
  [MoodType.SADNESS]: {
    id: MoodType.SADNESS,
    label: '悲しみ',
    labelEn: 'Sadness',
    description: '憂鬱や悲嘆',
    descriptionEn: 'Grief & melancholy',
    colorHex: '#334155', // slate-700
    bgClass: 'bg-slate-800',
    textClass: 'text-slate-300',
    ringClass: 'ring-slate-500'
  },
  [MoodType.ANGER]: {
    id: MoodType.ANGER,
    label: '怒り',
    labelEn: 'Anger',
    description: '不満やイライラ',
    descriptionEn: 'Frustration & irritation',
    colorHex: '#dc2626', // red-600
    bgClass: 'bg-red-700',
    textClass: 'text-red-100',
    ringClass: 'ring-red-400'
  }
};

export const MOOD_LIST = Object.values(MOODS);

export const UI_TEXT: Record<Language, any> = {
  ja: {
    appTitle: "Emotional Hue",
    appSubtitle: "色で感情を記録し、心の変化を見つめる。",
    footer: "データはブラウザ内にローカル保存されます。",
    weeklySpectrum: "今週のスペクトル",
    clearHistory: "履歴を削除",
    clearHistoryConfirm: "感情の記録履歴をすべて削除してもよろしいですか？",
    chartTitle: "感情の頻度（過去7日間）",
    timelineTitle: "直近のタイムライン",
    latest: "最新",
    noData: "まだ記録がありません。",
    logHistoryTitle: "記録ノート",
    noNote: "メモなし",
    installTitle: "アプリとして使う",
    noteDialog: {
      title: (mood: string) => `「${mood}」を記録しました`,
      desc: "今の感情の理由や、起きた出来事をメモに残しますか？",
      placeholder: "例：プレゼンが無事に終わった、コーヒーをこぼした...",
      skip: "スキップ",
      save: "保存する"
    },
    installGuide: {
      title: "アプリとして使う",
      desc: "このサイトをホーム画面に追加すると、ウィジェットのようにワンタップで起動し、全画面でスムーズに記録できます。",
      ios: {
        title: "iPhone (Safari) の場合",
        step1: "画面下部の「共有」アイコンをタップ",
        step2: "メニューから「ホーム画面に追加」を選択",
        step3: "右上の「追加」をタップ"
      },
      android: {
        title: "Android (Chrome) の場合",
        step1: "右上のメニューアイコンをタップ",
        step2: "「アプリをインストール」または「ホーム画面に追加」を選択"
      },
      close: "閉じる"
    },
    reminder: {
      enable: "リマインダーをオン",
      disable: "リマインダーをオフ",
      denied: "通知が許可されていません。ブラウザ設定を確認してください。",
      success: "12時と19時に通知します",
      noonTitle: "お昼の記録タイム",
      noonBody: "午後の活動の前に、今の気分を記録しませんか？",
      eveningTitle: "1日の振り返り",
      eveningBody: "今日1日を色で記録して、気持ちを整理しましょう。"
    }
  },
  en: {
    appTitle: "Emotional Hue",
    appSubtitle: "Visualize your feelings with colors.",
    footer: "Data is stored locally in your browser.",
    weeklySpectrum: "Weekly Spectrum",
    clearHistory: "Clear History",
    clearHistoryConfirm: "Are you sure you want to delete all history?",
    chartTitle: "Mood Frequency (Last 7 Days)",
    timelineTitle: "Recent Timeline",
    latest: "Latest",
    noData: "No records yet.",
    logHistoryTitle: "Journal",
    noNote: "No note",
    installTitle: "Install App",
    noteDialog: {
      title: (mood: string) => `Logged "${mood}"`,
      desc: "Would you like to add a note about what happened?",
      placeholder: "Ex: Finished the presentation, spilled my coffee...",
      skip: "Skip",
      save: "Save"
    },
    installGuide: {
      title: "Install App",
      desc: "Add to your home screen to use it like a native app for quick access.",
      ios: {
        title: "iPhone (Safari)",
        step1: "Tap 'Share' icon at the bottom",
        step2: "Select 'Add to Home Screen'",
        step3: "Tap 'Add' at top right"
      },
      android: {
        title: "Android (Chrome)",
        step1: "Tap the menu icon at top right",
        step2: "Select 'Install app' or 'Add to Home screen'"
      },
      close: "Close"
    },
    reminder: {
      enable: "Enable Reminders",
      disable: "Disable Reminders",
      denied: "Notifications blocked. Check browser settings.",
      success: "Notifications set for 12:00 & 19:00",
      noonTitle: "Midday Check-in",
      noonBody: "How are you feeling before the afternoon?",
      eveningTitle: "Evening Reflection",
      eveningBody: "Log your mood to wrap up the day."
    }
  }
};