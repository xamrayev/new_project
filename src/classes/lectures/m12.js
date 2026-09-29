/* M12. Back-end freymvorklari: Laravel, Django, Express.js. */
export default {
  id: 'm12',
  number: 12,
  title: 'Back-end freymvorklari: Laravel, Django, Express.js',
  summary: 'MVC arxitekturasi, marshrutlash, middleware, ORM va uch mashhur freymvorkning tuzilishi.',
  literature: [2],
  goals: [
    'Back-end freymvorklarning vazifasi va afzalliklarini tushunish.',
    'MVC (va MVT) arxitekturasini bilish.',
    'Marshrutlash, middleware, kontroller, model va shablon tushunchalarini o‘rganish.',
    'Laravel, Django va Express.js da oddiy CRUD tuzilishini qiyoslashni o‘rganish.'
  ],
  keywords: ['freymvork', 'MVC', 'MVT', 'marshrut', 'kontroller', 'model', 'view', 'middleware', 'ORM', 'Eloquent', 'Artisan', 'Django admin', 'Express', 'CRUD', 'validatsiya'],
  practicals: ['a12'],
  lessons: [],
  sections: [
    {
      title: 'Nima uchun back-end freymvork',
      blocks: [
        { lead: 'Har bir veb-ilovada takrorlanadigan vazifalar bor: marshrutlash, so‘rov ma’lumotlarini o‘qish, validatsiya, bazaga ulanish, sessiyalar, xavfsizlik, xatolarni qayta ishlash. Freymvork bularni tayyor, sinovdan o‘tgan holda beradi.' },
        { ul: [
          '**Tezlik**: tayyor komponentlar tufayli asosiy mantiqqa e’tibor qaratiladi.',
          '**Xavfsizlik**: CSRF himoyasi, parametrlangan so‘rovlar, parol xeshlash standart holatda yoqilgan.',
          '**Tuzilma**: jamoa a’zolari bir xil konvensiyalarga amal qiladi — «qayerda nima» aniq.',
          '**Ekotizim**: paketlar, hujjatlar, hamjamiyat.'
        ] },
        { note: 'Freymvorklar ikki falsafaga bo‘linadi: **«batareyalar bilan»** (Laravel, Django — hamma narsa bor) va **minimalistik** (Express, Flask — faqat yadro, qolganini o‘zingiz tanlaysiz).' }
      ]
    },
    {
      title: 'MVC arxitekturasi',
      blocks: [
        '**MVC** (Model–View–Controller) — ilovani uch mas’uliyatga ajratuvchi arxitektura namunasi.',
        { code: 'So‘rov: GET /students/5\n      │\n      ▼\n  ┌─────────┐   marshrut   ┌──────────────┐\n  │ Router  │ ───────────► │  Controller  │  so‘rovni boshqaradi\n  └─────────┘              └──┬────────┬──┘\n                              │        │\n                 ma’lumot so‘raydi   natijani uzatadi\n                              ▼        ▼\n                        ┌───────┐  ┌──────┐\n                        │ Model │  │ View │  HTML/JSON hosil qiladi\n                        └───┬───┘  └──────┘\n                            ▼\n                     Ma’lumotlar bazasi', lang: 'text', title: 'MVC oqimi' },
        { terms: [
          ['Model', 'Ma’lumot va u bilan bog‘liq qoidalar; baza bilan ishlaydi (ORM).'],
          ['View', 'Taqdimot: HTML shablon yoki JSON javob.'],
          ['Controller', 'So‘rovni qabul qiladi, modelni chaqiradi, natijani view ga beradi.'],
          ['Router', 'URL + metodni kontroller metodiga bog‘laydi.'],
          ['Middleware', 'So‘rov kontrollerga yetguncha (va javob qaytishda) ishlaydigan oraliq qatlam: autentifikatsiya, log, CORS, CSRF.']
        ] },
        'Django bu namunani **MVT** (Model–View–Template) deb ataydi: Django dagi «View» aslida kontroller vazifasini, «Template» esa ko‘rinishni bajaradi.'
      ]
    },
    {
      title: 'Laravel (PHP)',
      blocks: [
        '**Laravel** (2011, Teylor Otvell) — eng mashhur PHP freymvorki. Nafis sintaksis, kuchli **Eloquent** ORM, **Blade** shablonlari va **Artisan** buyruqlar qatori vositasi.',
        { code: 'app/\n├── Http/Controllers/StudentController.php\n├── Models/Student.php\nroutes/\n├── web.php          ← sahifalar marshrutlari\n└── api.php          ← API marshrutlari\nresources/views/students/index.blade.php\ndatabase/migrations/\n.env', lang: 'text', title: 'Loyiha tuzilishi' },
        { code: "// routes/web.php\nuse App\\Http\\Controllers\\StudentController;\nRoute::resource('students', StudentController::class)->middleware('auth');\n\n// app/Models/Student.php\nclass Student extends Model\n{\n    protected $fillable = ['full_name', 'email', 'gpa', 'group_id'];\n    public function group() { return $this->belongsTo(Group::class); }\n}\n\n// app/Http/Controllers/StudentController.php\nclass StudentController extends Controller\n{\n    public function index()\n    {\n        $students = Student::with('group')->orderBy('full_name')->paginate(20);\n        return view('students.index', compact('students'));\n    }\n\n    public function store(Request $request)\n    {\n        $data = $request->validate([\n            'full_name' => 'required|string|max:100',\n            'email'     => 'required|email|unique:students',\n            'group_id'  => 'required|exists:groups,id',\n        ]);\n        Student::create($data);\n        return redirect()->route('students.index')->with('ok', 'Talaba qo‘shildi');\n    }\n}", lang: 'php' },
        { code: "{{-- resources/views/students/index.blade.php --}}\n@extends('layouts.app')\n\n@section('content')\n  <h1>Talabalar</h1>\n  @foreach ($students as $student)\n    <p>{{ $student->full_name }} — {{ $student->group->name }}</p>\n  @endforeach\n  {{ $students->links() }}\n@endsection", lang: 'html', title: 'Blade shabloni' },
        { code: 'composer create-project laravel/laravel university\ncd university\nphp artisan make:model Student -mcr   # model + migratsiya + resurs kontroller\nphp artisan migrate\nphp artisan serve', lang: 'bash' }
      ]
    },
    {
      title: 'Django (Python)',
      blocks: [
        '**Django** (2005) — «muddati bor perfeksionistlar uchun freymvork». Kuchli ORM, avtomatik **admin panel**, autentifikatsiya, formalar va xavfsizlik standart holatda mavjud. Instagram, Pinterest, Mozilla saytlarida ishlatilgan.',
        { code: 'university/            ← loyiha sozlamalari\n├── settings.py\n└── urls.py\nstudents/              ← ilova (app)\n├── models.py\n├── views.py\n├── urls.py\n├── admin.py\n└── templates/students/list.html\nmanage.py', lang: 'text', title: 'Loyiha tuzilishi' },
        { code: "# students/models.py\nfrom django.db import models\n\nclass Group(models.Model):\n    name = models.CharField(max_length=20, unique=True)\n    def __str__(self): return self.name\n\nclass Student(models.Model):\n    full_name = models.CharField(max_length=100)\n    email = models.EmailField(unique=True)\n    gpa = models.DecimalField(max_digits=3, decimal_places=2, null=True)\n    group = models.ForeignKey(Group, on_delete=models.SET_NULL, null=True)\n\n# students/views.py\nfrom django.shortcuts import render\nfrom .models import Student\n\ndef student_list(request):\n    students = Student.objects.select_related('group').order_by('full_name')\n    return render(request, 'students/list.html', {'students': students})\n\n# students/urls.py\nfrom django.urls import path\nfrom . import views\nurlpatterns = [path('', views.student_list, name='student_list')]\n\n# students/admin.py — bir qatorda to‘liq admin panel\nadmin.site.register(Student)", lang: 'python' },
        { code: 'pip install django\ndjango-admin startproject university .\npython manage.py startapp students\npython manage.py makemigrations && python manage.py migrate\npython manage.py createsuperuser\npython manage.py runserver', lang: 'bash' }
      ]
    },
    {
      title: 'Express.js (Node.js)',
      blocks: [
        '**Express** (2010) — Node.js uchun minimalistik freymvork. U faqat marshrutlash va middleware ni beradi; ORM, validatsiya, shablonlar alohida paketlar sifatida tanlanadi. Aynan shu soddaligi uchun REST API yaratishda juda ommabop.',
        { code: "import express from 'express';\n\nconst app = express();\napp.use(express.json());                       // JSON tanani o‘qish\n\n// O‘zimizning middleware — har bir so‘rovni jurnalga yozadi\napp.use((req, res, next) => {\n  const started = Date.now();\n  res.on('finish', () => console.log(req.method, req.url, res.statusCode, `${Date.now() - started}ms`));\n  next();\n});\n\nconst students = [{ id: 1, fullName: 'Aziz Karimov' }];\n\napp.get('/api/students', (req, res) => res.json(students));\n\napp.get('/api/students/:id', (req, res) => {\n  const student = students.find((s) => s.id === Number(req.params.id));\n  if (!student) return res.status(404).json({ error: 'Topilmadi' });\n  res.json(student);\n});\n\napp.post('/api/students', (req, res) => {\n  if (!req.body.fullName) return res.status(422).json({ error: 'fullName majburiy' });\n  const student = { id: students.length + 1, fullName: req.body.fullName };\n  students.push(student);\n  res.status(201).json(student);\n});\n\n// Xatolarni markazlashgan qayta ishlash (4 ta parametr)\napp.use((err, req, res, next) => {\n  console.error(err);\n  res.status(500).json({ error: 'Serverda xatolik' });\n});\n\napp.listen(3000, () => console.log('http://localhost:3000'));", lang: 'js', title: 'server.js' },
        { tip: 'Katta Express loyihalarida tuzilma o‘zingiz tomonidan belgilanadi: `routes/`, `controllers/`, `services/`, `models/` papkalari. Qat’iy tuzilma kerak bo‘lsa — **NestJS** freymvorkiga qarang.' }
      ]
    },
    {
      title: 'Qiyosiy tahlil',
      blocks: [
        { table: { head: ['Imkoniyat', 'Laravel', 'Django', 'Express'], rows: [
          ['Til', 'PHP', 'Python', 'JavaScript / TypeScript'],
          ['Arxitektura', 'MVC', 'MVT', 'Erkin (odatda MVC ga o‘xshash)'],
          ['ORM', 'Eloquent', 'Django ORM', 'Tanlanadi: Prisma, Sequelize…'],
          ['Shablonlar', 'Blade', 'Django templates', 'Tanlanadi: EJS, Pug…'],
          ['Migratsiyalar', 'Bor', 'Bor', 'ORM ga bog‘liq'],
          ['Admin panel', 'Paketlar (Filament, Nova)', 'O‘rnatilgan', 'Yo‘q'],
          ['Autentifikatsiya', 'Breeze, Sanctum, Fortify', 'O‘rnatilgan', 'Passport.js, JWT paketlari'],
          ['CLI', 'Artisan', 'manage.py', 'Yo‘q (npm skriptlari)'],
          ['Kuchli tomoni', 'Tez ishlab chiqish, qulay sintaksis', 'Xavfsizlik, admin, ma’lumotlar bilan ishlash', 'Moslashuvchanlik, bitta til, real vaqt']
        ] } },
        { h: 'CRUD va resurs marshrutlari' },
        'Uch freymvorkda ham CRUD (Create, Read, Update, Delete) amallari bir xil marshrutlar to‘plamiga moslanadi:',
        { table: { head: ['Amal', 'Metod', 'URL', 'Laravel kontroller metodi'], rows: [
          ['Ro‘yxat', 'GET', '`/students`', '`index`'],
          ['Yaratish formasi', 'GET', '`/students/create`', '`create`'],
          ['Saqlash', 'POST', '`/students`', '`store`'],
          ['Ko‘rish', 'GET', '`/students/{id}`', '`show`'],
          ['Tahrirlash formasi', 'GET', '`/students/{id}/edit`', '`edit`'],
          ['Yangilash', 'PUT/PATCH', '`/students/{id}`', '`update`'],
          ['O‘chirish', 'DELETE', '`/students/{id}`', '`destroy`']
        ] } }
      ]
    }
  ],
  conclusion: [
    'Back-end freymvorklari marshrutlash, middleware, ORM, validatsiya va xavfsizlik kabi takrorlanuvchi vazifalarni tayyor holda beradi va kodni MVC (MVT) arxitekturasi bo‘yicha tartibga soladi.',
    'Laravel va Django — «batareyalar bilan» to‘liq freymvorklar, Express — minimalistik va moslashuvchan. CRUD amallari uchalasida ham resurs marshrutlari orqali bir xil tamoyilda quriladi.'
  ],
  glossary: [
    ['MVC', 'Model, View va Controller ga ajratilgan arxitektura namunasi.'],
    ['Kontroller', 'So‘rovni qayta ishlab, model va view ni bog‘lovchi qism.'],
    ['Middleware', 'So‘rov va javob yo‘lidagi oraliq ishlov beruvchi.'],
    ['CRUD', 'Yaratish, o‘qish, yangilash, o‘chirish — ma’lumot ustidagi asosiy amallar.'],
    ['Eloquent', 'Laravel ORM i.'],
    ['Blade', 'Laravel shablonizatori.'],
    ['Artisan', 'Laravel buyruqlar qatori vositasi.']
  ],
  questions: [
    'Back-end freymvork qanday afzalliklar beradi?',
    'MVC arxitekturasining har bir qismi vazifasini tushuntiring.',
    'Django dagi MVT ning MVC dan farqi nimada?',
    'Middleware nima? Uchta misol keltiring.',
    'Laravel da `php artisan make:model Student -mcr` buyrug‘i nimalar yaratadi?',
    'Django admin panelining afzalligi nimada?',
    'Express da xatolarni qayta ishlash middleware i qanday yoziladi?',
    '«Batareyalar bilan» va minimalistik freymvorklar farqi nimada?',
    'Resurs marshrutlari bo‘yicha CRUD amallarini sanab bering.',
    'Qanday loyiha uchun Laravel, Django yoki Express ni tanlagan bo‘lardingiz?'
  ]
};
