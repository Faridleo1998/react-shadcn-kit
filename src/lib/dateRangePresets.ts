export const todayPreset = {
  name: "today",
  label: "Today",
  getValue: () => {
    const from = new Date();
    const to = new Date();
    from.setHours(0, 0, 0, 0);
    to.setHours(23, 59, 59, 999);
    return { from, to };
  },
};

export const yesterdayPreset = {
  name: "yesterday",
  label: "Yesterday",
  getValue: () => {
    const from = new Date();
    const to = new Date();
    from.setDate(from.getDate() - 1);
    from.setHours(0, 0, 0, 0);
    to.setDate(to.getDate() - 1);
    to.setHours(23, 59, 59, 999);
    return { from, to };
  },
};

export const last7Preset = {
  name: "last7",
  label: "Last 7 Days",
  getValue: () => {
    const from = new Date();
    const to = new Date();
    from.setDate(from.getDate() - 6);
    from.setHours(0, 0, 0, 0);
    to.setHours(23, 59, 59, 999);
    return { from, to };
  },
};

export const last14Preset = {
  name: "last14",
  label: "Last 14 Days",
  getValue: () => {
    const from = new Date();
    const to = new Date();
    from.setDate(from.getDate() - 13);
    from.setHours(0, 0, 0, 0);
    to.setHours(23, 59, 59, 999);
    return { from, to };
  },
};

export const last30Preset = {
  name: "last30",
  label: "Last 30 Days",
  getValue: () => {
    const from = new Date();
    const to = new Date();
    from.setDate(from.getDate() - 29);
    from.setHours(0, 0, 0, 0);
    to.setHours(23, 59, 59, 999);
    return { from, to };
  },
};

export const thisWeekPreset = {
  name: "thisWeek",
  label: "This Week",
  getValue: () => {
    const from = new Date();
    const to = new Date();
    const first = from.getDate() - from.getDay();
    from.setDate(first);
    from.setHours(0, 0, 0, 0);
    to.setHours(23, 59, 59, 999);
    return { from, to };
  },
};

export const lastWeekPreset = {
  name: "lastWeek",
  label: "Last Week",
  getValue: () => {
    const from = new Date();
    const to = new Date();
    from.setDate(from.getDate() - 7 - from.getDay());
    to.setDate(to.getDate() - to.getDay() - 1);
    from.setHours(0, 0, 0, 0);
    to.setHours(23, 59, 59, 999);
    return { from, to };
  },
};

export const thisMonthPreset = {
  name: "thisMonth",
  label: "This Month",
  getValue: () => {
    const from = new Date();
    const to = new Date();
    from.setDate(1);
    from.setHours(0, 0, 0, 0);
    to.setHours(23, 59, 59, 999);
    return { from, to };
  },
};

export const lastMonthPreset = {
  name: "lastMonth",
  label: "Last Month",
  getValue: () => {
    const from = new Date();
    const to = new Date();
    from.setMonth(from.getMonth() - 1);
    from.setDate(1);
    from.setHours(0, 0, 0, 0);
    to.setDate(0);
    to.setHours(23, 59, 59, 999);
    return { from, to };
  },
};

export const lastYearPreset = {
  name: "lastYear",
  label: "Last Year",
  getValue: () => {
    const from = new Date();
    const to = new Date();
    const lastYear = from.getFullYear() - 1;
    from.setFullYear(lastYear, 0, 1);
    from.setHours(0, 0, 0, 0);
    to.setFullYear(lastYear, 11, 31);
    to.setHours(23, 59, 59, 999);
    return { from, to };
  },
};

export const presets = [
  todayPreset,
  yesterdayPreset,
  last7Preset,
  last14Preset,
  last30Preset,
  thisWeekPreset,
  lastWeekPreset,
  thisMonthPreset,
  lastMonthPreset,
  lastYearPreset,
];
