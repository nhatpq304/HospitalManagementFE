export default {
  formatDateString(date: Date) {
    let shortDate = date.toISOString().slice(0, 10);

    return `${shortDate.slice(8, 10)}/${shortDate.slice(
      5,
      7
    )}/${shortDate.slice(0, 4)}`;
  }
};
