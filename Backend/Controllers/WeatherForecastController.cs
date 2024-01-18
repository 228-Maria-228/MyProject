using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Logging;

namespace Создание_первого_API._Взаимодействие_с_API_.Controllers
{
    public class WeatherData
    {
        public int Id { get; set; }
        public string Date { get; set; }
        public int Degree { get; set; }
        public string Location { get; set; }

    }

    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static List<string> Summaries = new() { "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching" };

        public static List<WeatherData> weatherDatas = new()
        {
            new WeatherData() { Id = 1,  Date = "21.01.2022", Degree = 10,  Location = "Мурманск" },
            new WeatherData() { Id = 23, Date = "10.08.2019", Degree = -20, Location = "Пермь"},
            new WeatherData() { Id = 24, Date = "05.11.2020", Degree = 15,  Location = "Омск"},
            new WeatherData() { Id = 25, Date = "07.02.2021", Degree = 0,   Location = "Томск"},
            new WeatherData() { Id = 30, Date = "30.05.2022", Degree = 3,   Location = "Калининград"},
        };

        private readonly ILogger<WeatherForecastController> _logger;
        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public List<WeatherData> GetAll()
        {
            return weatherDatas; // возвращение всех записей списка
        }

        [HttpPost]
        public IActionResult Add(WeatherData data)
        {
            if (data.Id < 0)
            {
                return BadRequest("Id не может быть меньше 0");
            }

            for (int i = 0; i < weatherDatas.Count; i++) // Цикл, который обходит каждый элемент массива weatherDatas
            {
                if (weatherDatas[i].Id == data.Id) // В случае, если идентификаторы одинаковые - выполним следующее
                {
                    return BadRequest("Запись с таким Id уже есть"); // Возвращение результата "Ошибка" с сообщением
                }
            }
            weatherDatas.Add(data); // Добавляем в список новую запись
            return Ok(); // Возвращение результата "Успешно"
        }

        [HttpPut]
        public IActionResult Update(WeatherData data)
        {
            if (data.Id < 0)
            {
                return BadRequest("Id не может быть меньше 0");
            }

            for (int i = 0; i < weatherDatas.Count; i++) // цикл, который обходит каждый элемент массива weatherDatas
            {
                if (weatherDatas[i].Id == data.Id) // В случае, если идентификаторы одинаковые - выполним следующее
                {
                    weatherDatas[i] = data; // заменяем значение для данной ячейки массива
                    return Ok();
                }
            }
            return BadRequest("Такая запись не обнаружена"); // Возвращение результата "Ошибка" с сообщением
        }

        [HttpDelete]
        public IActionResult Delete(int id)
        {
            for (int i = 0; i < weatherDatas.Count; i++) // цикл, который обходит каждый элемент массива weatherDatas
            {
                if (weatherDatas[i].Id == id) // в случае, если идентификаторы одинаковые - выполним следующее
                {
                    weatherDatas.RemoveAt(i); // удаляем элемент из массива по его индексу (переменная i)
                    return Ok(); // возвращение результата "Успешно"
                }
            }
            return BadRequest("Такая запись не обнаружена"); // Возвращение результата "Ошибка" с сообщением
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            for (int i = 0; i < weatherDatas.Count; i++) // цикл, который обходит каждый элемент массива weatherDatas
            {
                if (weatherDatas[i].Id == id) // в случае, если идентификаторы одинаковые - выполним следующее
                {
                    return Ok(weatherDatas[i]); // возвращение результата "Успешно" с данными о записи
                }
            }
            return BadRequest("Такая запись не обнаружена"); // Возвращение результата "Ошибка" с сообщением
        }

        [HttpGet("find-by-name")]
        public IActionResult GetCount(string name)
        {
            if (name == null)
            {
                return BadRequest("Имя не может быть пустым!!!!");
            }

            int count = Summaries.Count(x => x == name);
            return Ok(count);
        }

        [HttpGet("sort")]
        public IActionResult GetAll(int? sortStrategy)
        {
            if (sortStrategy == null)
            {
                return Ok(Summaries);
            }
            else if (sortStrategy == 1)
            {
                return Ok(Summaries.OrderBy(x => x));
            }
            else if (sortStrategy == -1)
            {
                return Ok(Summaries.OrderByDescending(x => x));
            }
            else
            {
                return BadRequest("Некорректное значение параметра sortStrategy");
            }
        }

        [HttpGet("get-by-city-name")]
        public IActionResult GetByCityName(string location)
        {
            if (string.IsNullOrEmpty(location))
            {
                return BadRequest("Название города не может быть пустым");
            }

            var city = weatherDatas.FirstOrDefault(x => x.Location == location);

            if (city == null)
            {
                return Ok("Запись с указанным городом не обнаружено");
            }
            else
            {
                return Ok("Запись с указанным городом имеется в нашем списке");
            }
        }
    }
}
