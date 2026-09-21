/*
 * Сообщения, которые формируются внутри песочницы (harness.js).
 * Словарь передаётся в iframe вместе с конфигурацией, потому что сам harness
 * ничего не импортирует.
 */
export const ru = {
  'net.blocked': 'Сеть в песочнице отключена. Доступные адреса: {list}',
  'net.none': 'нет',

  'sel.invalid': 'Некорректный селектор {selector}',
  'sel.notFound': 'Не найден элемент по селектору {selector}',
  'sel.noneMatched': 'Ни один элемент {selector} не подошёл',

  'cmp.equals': '{label}: ожидалось "{expected}", получено "{actual}"',
  'cmp.contains': '{label}: не содержит "{expected}" (получено "{actual}")',
  'cmp.notContains': '{label}: не должно содержать "{expected}"',
  'cmp.matches': '{label}: не соответствует шаблону /{pattern}/',
  'cmp.oneOf': '{label}: ожидалось одно из [{expected}], получено "{actual}"',
  'cmp.min': '{label}: ожидалось не меньше {expected}, получено {actual}',
  'cmp.max': '{label}: ожидалось не больше {expected}, получено {actual}',

  'label.text': 'Текст {selector}',
  'label.html': 'Разметка внутри {selector}',
  'label.attr': 'Атрибут {name} у {selector}',
  'label.prop': 'Свойство {name} у {selector}',
  'label.style': 'CSS {prop} у {selector}',
  'label.count': 'Количество {selector}',
  'label.source': 'Код ({lang})',
  'label.console': 'Вывод в консоль',
  'label.alert': 'Текст alert()',
  'label.storage': 'localStorage["{key}"]',
  'label.cssRule': 'Свойство {prop}{where}',
  'where.media': ' внутри @media ({media})',

  'el.mustNotExist': 'Элемент {selector} не должен присутствовать',
  'attr.missing': 'У элемента {selector} нет атрибута {name}',
  'attr.forbidden': 'У элемента {selector} не должно быть атрибута {name}',
  'rule.notFound': 'Не найдено правило для {selector}{where}',
  'rule.noProp': 'В правиле {selector}{where} нет свойства {prop}',

  'console.empty': 'Консоль пуста — ожидался вывод через console.log()',
  'alert.none': 'Не было вызова alert() / prompt() / confirm()',
  'error.line': ' (строка {line})',
  'error.inConsole': 'В консоли есть ошибка: {message}',
  'storage.missing': 'В localStorage нет ключа "{key}"',

  'check.unknown': 'Неизвестный тип проверки: {kind}',
  'check.error': 'Ошибка при проверке: {message}',
  'check.failed': 'Проверка не пройдена',

  'step.unknown': 'Неизвестный шаг: {step}',
  'step.noAppear': 'Элемент {selector} так и не появился',
  'step.noClick': 'Нечего нажимать: нет элемента {selector}',
  'step.noField': 'Нет поля {selector}',
  'step.noElement': 'Нет элемента {selector}',
  'step.noForm': 'Нет формы {selector}'
};
