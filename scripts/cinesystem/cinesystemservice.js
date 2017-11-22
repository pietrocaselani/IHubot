const got = require('got')

const _format_date = (date_text) => {
  const today = new Date();

  var selectedDate = today;

  if (/(amanhã|amanha)/i.exec(date_text) !== null) {
    selectedDate = new Date(selectedDate.getTime() + 86400000);
  } else if (/(hoje)/i.exec(date_text) === null) {
    const dateArray = date_text.split('/');
    selectedDate = new Date(today.getFullYear(), parseInt(dateArray[1] - 1, 10), parseInt(dateArray[0], 10));
  }

  return `${selectedDate.getDate()}/${selectedDate.getMonth() + 1}`
}

const _filter_results = (date, results) => {
  return results.filter(obj => {
    return obj['dateFormatted'] === date;
  });
};

const _parse_results = (date_text, results) => {
  const date = _format_date(date_text);

  const filtered_results = _filter_results(date, results);

  if (filtered_results.length == 0) {
    throw new Error('Nenhum filme! So sorry!');
  }

  const movies = filtered_results[0]['movies'];

  return movies.map(movie => {
    return movie['title'];
  });
};

const CinesystemService = {
  get_movies: (date_text) => {
    return got('https://api-content.ingresso.com/v0/sessions/city/68/theater/437')
      .then(response => {
        const results = JSON.parse(response.body);
        return _parse_results(date_text, results);
      })
  }
};

module.exports = CinesystemService;
