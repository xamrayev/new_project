/* Sinov muhiti (harness.js) ichida hosil bo‘ladigan xabarlar — o‘zbekcha. */
export const uz = {
  'net.blocked': 'Sinov muhitida tarmoq o‘chirilgan. Mavjud manzillar: {list}',
  'net.none': 'yo‘q',

  'sel.invalid': 'Noto‘g‘ri selektor {selector}',
  'sel.notFound': '{selector} selektori bo‘yicha element topilmadi',
  'sel.noneMatched': '{selector} elementlaridan birortasi ham mos kelmadi',

  'cmp.equals': '{label}: "{expected}" kutilgan edi, "{actual}" olindi',
  'cmp.contains': '{label}: "{expected}" matnini o‘z ichiga olmaydi ("{actual}" olindi)',
  'cmp.notContains': '{label}: "{expected}" bo‘lmasligi kerak',
  'cmp.matches': '{label}: /{pattern}/ shabloniga mos kelmaydi',
  'cmp.oneOf': '{label}: [{expected}] dan biri kutilgan edi, "{actual}" olindi',
  'cmp.min': '{label}: kamida {expected} kutilgan edi, {actual} olindi',
  'cmp.max': '{label}: ko‘pi bilan {expected} kutilgan edi, {actual} olindi',

  'label.text': '{selector} matni',
  'label.html': '{selector} ichidagi belgilash',
  'label.attr': '{selector} elementining {name} atributi',
  'label.prop': '{selector} elementining {name} xossasi',
  'label.style': '{selector} uchun CSS {prop}',
  'label.count': '{selector} soni',
  'label.source': 'Kod ({lang})',
  'label.console': 'Konsolga chiqarish',
  'label.alert': 'alert() matni',
  'label.storage': 'localStorage["{key}"]',
  'label.cssRule': '{prop} xossasi{where}',
  'where.media': ' — @media ({media}) ichida',

  'el.mustNotExist': '{selector} elementi bo‘lmasligi kerak',
  'attr.missing': '{selector} elementida {name} atributi yo‘q',
  'attr.forbidden': '{selector} elementida {name} atributi bo‘lmasligi kerak',
  'rule.notFound': '{selector} uchun qoida topilmadi{where}',
  'rule.noProp': '{selector} qoidasida{where} {prop} xossasi yo‘q',

  'console.empty': 'Konsol bo‘sh — console.log() orqali chiqarish kutilgan edi',
  'alert.none': 'alert() / prompt() / confirm() chaqirilmadi',
  'error.line': ' ({line}-qator)',
  'error.inConsole': 'Konsolda xatolik bor: {message}',
  'storage.missing': 'localStorage ichida "{key}" kaliti yo‘q',

  'check.unknown': 'Noma’lum tekshiruv turi: {kind}',
  'check.error': 'Tekshirish vaqtida xatolik: {message}',
  'check.failed': 'Tekshiruv o‘tmadi',

  'step.unknown': 'Noma’lum qadam: {step}',
  'step.noAppear': '{selector} elementi paydo bo‘lmadi',
  'step.noClick': 'Bosadigan narsa yo‘q: {selector} elementi topilmadi',
  'step.noField': '{selector} maydoni yo‘q',
  'step.noElement': '{selector} elementi yo‘q',
  'step.noForm': '{selector} formasi yo‘q'
};
