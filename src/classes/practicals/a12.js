/* A12. Back-end freymvorkida (Laravel/Django) CRUD operatsiyalarini amalga oshirish. */
export default {
  id: 'a12',
  number: 12,
  title: 'Back-end freymvorkida (Laravel/Django) CRUD operatsiyalarini amalga oshirish',
  summary: 'Laravel da «Talabalar» moduli: migratsiya, model, resurs kontroller, Blade shablonlari, validatsiya; Django dagi ekvivalenti.',
  lectures: ['m12', 'm13', 'm15'],
  lessons: [],
  goal: 'MVC freymvorki (Laravel yoki Django) yordamida ma’lumotlarni yaratish, o‘qish, yangilash va o‘chirish (CRUD) amallarini migratsiya, model, kontroller va shablonlar orqali to‘liq amalga oshirish ko‘nikmasini shakllantirish.',
  outcomes: [
    'freymvork loyihasini yaratadi va bazaga ulaydi;',
    'migratsiya va model orqali jadval va munosabatlarni tavsiflaydi;',
    'resurs marshrutlari va kontroller metodlari bilan CRUD ni amalga oshiradi;',
    'shablonlarda ro‘yxat, forma, xato xabarlari va sahifalashni ko‘rsatadi;',
    'CSRF himoyasi, validatsiya va mass assignment himoyasining ahamiyatini tushuntiradi.'
  ],
  tools: [
    '**Laravel yo‘li**: PHP 8.2+, Composer, MySQL (yoki SQLite). Windows da qulay: Laravel Herd yoki XAMPP + Composer.',
    '**Django yo‘li**: Python 3.11+, pip, virtual muhit.',
    'VS Code kengaytmalari: PHP Intelephense, Laravel Blade / Python.'
  ],
  theory: [
    { table: { head: ['Amal', 'HTTP', 'URL', 'Laravel metod', 'Django view'], rows: [
      ['Ro‘yxat', 'GET', '`/students`', '`index`', '`student_list`'],
      ['Yaratish formasi', 'GET', '`/students/create`', '`create`', '`student_create` (GET)'],
      ['Saqlash', 'POST', '`/students`', '`store`', '`student_create` (POST)'],
      ['Ko‘rish', 'GET', '`/students/{id}`', '`show`', '`student_detail`'],
      ['Tahrirlash formasi', 'GET', '`/students/{id}/edit`', '`edit`', '`student_update` (GET)'],
      ['Yangilash', 'PUT/PATCH', '`/students/{id}`', '`update`', '`student_update` (POST)'],
      ['O‘chirish', 'DELETE', '`/students/{id}`', '`destroy`', '`student_delete` (POST)']
    ] } },
    { note: 'HTML formalari faqat GET va POST yubora oladi. Laravel PUT/DELETE ni `@method(\'PUT\')` yashirin maydoni orqali imitatsiya qiladi; Django da esa odatda POST ishlatiladi.' }
  ],
  steps: [
    {
      title: 'Laravel loyihasini yaratish va bazaga ulash',
      blocks: [
        { code: 'composer create-project laravel/laravel university-crud\ncd university-crud\nphp artisan serve          # http://127.0.0.1:8000', lang: 'bash' },
        '`.env` faylida baza sozlamalarini kiriting (yoki eng oson yo‘l — SQLite):',
        { code: 'DB_CONNECTION=mysql\nDB_HOST=127.0.0.1\nDB_PORT=3306\nDB_DATABASE=university_crud\nDB_USERNAME=root\nDB_PASSWORD=\n\n# yoki:\n# DB_CONNECTION=sqlite    (database/database.sqlite fayli)', lang: 'env', title: '.env' },
        { tip: 'Loyiha tuzilishi: `app/Models` — modellar, `app/Http/Controllers` — kontrollerlar, `routes/web.php` — marshrutlar, `resources/views` — Blade shablonlari, `database/migrations` — migratsiyalar.' }
      ]
    },
    {
      title: 'Migratsiyalar: guruhlar va talabalar',
      blocks: [
        { code: 'php artisan make:model Group -m\nphp artisan make:model Student -mcr --requests\n# -m: migratsiya, -c: kontroller, -r: resurs metodlari, --requests: Form Request klasslari', lang: 'bash' },
        { code: "// database/migrations/…_create_groups_table.php\nSchema::create('groups', function (Blueprint $table) {\n    $table->id();\n    $table->string('name', 20)->unique();\n    $table->string('faculty', 100);\n    $table->timestamps();\n});\n\n// database/migrations/…_create_students_table.php\nSchema::create('students', function (Blueprint $table) {\n    $table->id();\n    $table->string('full_name', 100);\n    $table->string('email')->unique();\n    $table->date('birth_date')->nullable();\n    $table->decimal('gpa', 3, 2)->nullable();\n    $table->foreignId('group_id')->nullable()->constrained()->nullOnDelete();\n    $table->timestamps();\n});", lang: 'php' },
        { code: 'php artisan migrate', lang: 'bash' }
      ]
    },
    {
      title: 'Modellar, munosabatlar va boshlang‘ich ma’lumotlar',
      blocks: [
        { code: "// app/Models/Student.php\nclass Student extends Model\n{\n    use HasFactory;\n\n    // Mass assignment himoyasi: faqat shu maydonlar create()/update() bilan to‘ldiriladi\n    protected $fillable = ['full_name', 'email', 'birth_date', 'gpa', 'group_id'];\n\n    protected $casts = ['birth_date' => 'date', 'gpa' => 'decimal:2'];\n\n    public function group(): BelongsTo\n    {\n        return $this->belongsTo(Group::class);\n    }\n}\n\n// app/Models/Group.php\nclass Group extends Model\n{\n    protected $fillable = ['name', 'faculty'];\n\n    public function students(): HasMany\n    {\n        return $this->hasMany(Student::class);\n    }\n}", lang: 'php' },
        { code: "// database/seeders/DatabaseSeeder.php\npublic function run(): void\n{\n    $di22 = Group::create(['name' => 'DI-22', 'faculty' => 'Axborot texnologiyalari']);\n    Group::create(['name' => 'DI-21', 'faculty' => 'Axborot texnologiyalari']);\n\n    Student::factory()->count(25)->create(['group_id' => $di22->id]);\n}\n\n// database/factories/StudentFactory.php\npublic function definition(): array\n{\n    return [\n        'full_name' => fake()->name(),\n        'email' => fake()->unique()->safeEmail(),\n        'birth_date' => fake()->dateTimeBetween('-24 years', '-17 years'),\n        'gpa' => fake()->randomFloat(2, 2.5, 5),\n    ];\n}", lang: 'php' },
        { code: 'php artisan migrate:fresh --seed\nphp artisan tinker\n>>> Student::with(\'group\')->first()\n>>> Group::withCount(\'students\')->get()', lang: 'bash' }
      ]
    },
    {
      title: 'Marshrutlar va resurs kontroller',
      blocks: [
        { code: "// routes/web.php\nuse App\\Http\\Controllers\\StudentController;\n\nRoute::redirect('/', '/students');\nRoute::resource('students', StudentController::class);", lang: 'php' },
        { code: 'php artisan route:list --path=students', lang: 'bash' },
        { code: "// app/Http/Controllers/StudentController.php\nclass StudentController extends Controller\n{\n    public function index(Request $request)\n    {\n        $students = Student::with('group')\n            ->when($request->search, fn ($q, $search) => $q->where('full_name', 'like', \"%{$search}%\"))\n            ->orderBy('full_name')\n            ->paginate(10)\n            ->withQueryString();\n\n        return view('students.index', compact('students'));\n    }\n\n    public function create()\n    {\n        return view('students.form', ['student' => new Student(), 'groups' => Group::orderBy('name')->get()]);\n    }\n\n    public function store(StoreStudentRequest $request)\n    {\n        $student = Student::create($request->validated());\n        return redirect()->route('students.show', $student)->with('ok', 'Talaba qo‘shildi');\n    }\n\n    public function show(Student $student)          // Route model binding: {id} → Student\n    {\n        return view('students.show', compact('student'));\n    }\n\n    public function edit(Student $student)\n    {\n        return view('students.form', ['student' => $student, 'groups' => Group::orderBy('name')->get()]);\n    }\n\n    public function update(UpdateStudentRequest $request, Student $student)\n    {\n        $student->update($request->validated());\n        return redirect()->route('students.show', $student)->with('ok', 'O‘zgarishlar saqlandi');\n    }\n\n    public function destroy(Student $student)\n    {\n        $student->delete();\n        return redirect()->route('students.index')->with('ok', 'Talaba o‘chirildi');\n    }\n}", lang: 'php' }
      ]
    },
    {
      title: 'Validatsiya: Form Request',
      blocks: [
        { code: "// app/Http/Requests/StoreStudentRequest.php\nclass StoreStudentRequest extends FormRequest\n{\n    public function authorize(): bool\n    {\n        return true;   // kirish huquqi (keyinchalik: faqat admin)\n    }\n\n    public function rules(): array\n    {\n        return [\n            'full_name'  => ['required', 'string', 'min:3', 'max:100'],\n            'email'      => ['required', 'email', 'unique:students,email'],\n            'birth_date' => ['nullable', 'date', 'before:-16 years'],\n            'gpa'        => ['nullable', 'numeric', 'between:0,5'],\n            'group_id'   => ['nullable', 'exists:groups,id'],\n        ];\n    }\n\n    public function attributes(): array\n    {\n        return ['full_name' => 'F.I.Sh.', 'group_id' => 'Guruh', 'birth_date' => 'Tug‘ilgan sana'];\n    }\n}\n\n// UpdateStudentRequest — xuddi shunday, faqat e-mail o‘zini hisobga olmaydi:\n'email' => ['required', 'email', Rule::unique('students')->ignore($this->route('student'))],", lang: 'php' },
        { tip: 'Xato xabarlarini o‘zbekchaga o‘girish uchun `php artisan lang:publish` bilan `lang/` papkasini yarating va `config/app.php` da `locale` ni `uz` qiling.' }
      ]
    },
    {
      title: 'Blade shablonlari: ro‘yxat va forma',
      blocks: [
        { code: "{{-- resources/views/layouts/app.blade.php --}}\n<!doctype html>\n<html lang=\"uz\">\n<head>\n  <meta charset=\"utf-8\">\n  <title>@yield('title', 'Talabalar')</title>\n  <link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css\">\n</head>\n<body>\n  <main class=\"container\">\n    @if (session('ok'))\n      <article>{{ session('ok') }}</article>\n    @endif\n    @yield('content')\n  </main>\n</body>\n</html>", lang: 'html', title: 'layouts/app.blade.php' },
        { code: "{{-- resources/views/students/index.blade.php --}}\n@extends('layouts.app')\n\n@section('content')\n  <h1>Talabalar</h1>\n  <form method=\"GET\">\n    <input name=\"search\" value=\"{{ request('search') }}\" placeholder=\"Ism bo‘yicha qidirish\">\n  </form>\n  <a href=\"{{ route('students.create') }}\" role=\"button\">+ Yangi talaba</a>\n\n  <table>\n    <thead><tr><th>F.I.Sh.</th><th>Guruh</th><th>GPA</th><th></th></tr></thead>\n    <tbody>\n      @forelse ($students as $student)\n        <tr>\n          <td><a href=\"{{ route('students.show', $student) }}\">{{ $student->full_name }}</a></td>\n          <td>{{ $student->group?->name ?? '—' }}</td>\n          <td>{{ $student->gpa }}</td>\n          <td>\n            <a href=\"{{ route('students.edit', $student) }}\">Tahrirlash</a>\n            <form method=\"POST\" action=\"{{ route('students.destroy', $student) }}\" style=\"display:inline\"\n                  onsubmit=\"return confirm('O‘chirilsinmi?')\">\n              @csrf\n              @method('DELETE')\n              <button class=\"secondary\">O‘chirish</button>\n            </form>\n          </td>\n        </tr>\n      @empty\n        <tr><td colspan=\"4\">Talabalar topilmadi</td></tr>\n      @endforelse\n    </tbody>\n  </table>\n\n  {{ $students->links() }}\n@endsection", lang: 'html', title: 'students/index.blade.php' },
        { code: "{{-- resources/views/students/form.blade.php — yaratish va tahrirlash uchun bitta forma --}}\n@extends('layouts.app')\n\n@section('content')\n  <h1>{{ $student->exists ? 'Tahrirlash' : 'Yangi talaba' }}</h1>\n\n  <form method=\"POST\"\n        action=\"{{ $student->exists ? route('students.update', $student) : route('students.store') }}\">\n    @csrf\n    @if ($student->exists) @method('PUT') @endif\n\n    <label>F.I.Sh.\n      <input name=\"full_name\" value=\"{{ old('full_name', $student->full_name) }}\"\n             @error('full_name') aria-invalid=\"true\" @enderror>\n    </label>\n    @error('full_name') <small>{{ $message }}</small> @enderror\n\n    <label>E-mail\n      <input name=\"email\" type=\"email\" value=\"{{ old('email', $student->email) }}\">\n    </label>\n    @error('email') <small>{{ $message }}</small> @enderror\n\n    <label>GPA\n      <input name=\"gpa\" type=\"number\" step=\"0.01\" value=\"{{ old('gpa', $student->gpa) }}\">\n    </label>\n\n    <label>Guruh\n      <select name=\"group_id\">\n        <option value=\"\">—</option>\n        @foreach ($groups as $group)\n          <option value=\"{{ $group->id }}\" @selected(old('group_id', $student->group_id) == $group->id)>{{ $group->name }}</option>\n        @endforeach\n      </select>\n    </label>\n\n    <button>Saqlash</button>\n  </form>\n@endsection", lang: 'html', title: 'students/form.blade.php' },
        { warn: '`@csrf` direktivasini olib tashlab formani yuborib ko‘ring — Laravel `419 Page Expired` qaytaradi. Bu CSRF himoyasi ishlayotganini ko‘rsatadi (M14). `{{ }}` esa chiqishni avtomatik ekranlaydi (XSS himoyasi).' }
      ]
    },
    {
      title: 'API variant: JSON CRUD',
      blocks: [
        'Xuddi shu modelga SPA yoki mobil ilova uchun REST API ham qo‘shing:',
        { code: 'php artisan install:api\nphp artisan make:controller Api/StudentController --api --model=Student\nphp artisan make:resource StudentResource', lang: 'bash' },
        { code: "// routes/api.php\nRoute::apiResource('students', Api\\StudentController::class);\n\n// app/Http/Controllers/Api/StudentController.php\npublic function index()  { return StudentResource::collection(Student::with('group')->paginate(20)); }\npublic function store(StoreStudentRequest $r) { return new StudentResource(Student::create($r->validated())); }  // 201\npublic function show(Student $student) { return new StudentResource($student->load('group')); }\npublic function update(UpdateStudentRequest $r, Student $student) { $student->update($r->validated()); return new StudentResource($student); }\npublic function destroy(Student $student) { $student->delete(); return response()->noContent(); }  // 204", lang: 'php' },
        { code: "curl http://127.0.0.1:8000/api/students\ncurl -X POST http://127.0.0.1:8000/api/students -H 'Accept: application/json' -H 'Content-Type: application/json' \\\n  -d '{\"full_name\":\"Laylo Ergasheva\",\"email\":\"laylo@mail.uz\"}'", lang: 'bash' }
      ]
    },
    {
      title: 'Django yo‘li (muqobil)',
      blocks: [
        'Laravel o‘rniga Django tanlagan talabalar uchun ekvivalent qadamlar:',
        { code: 'python -m venv venv && source venv/bin/activate     # Windows: venv\\Scripts\\activate\npip install django\ndjango-admin startproject config .\npython manage.py startapp students\n# config/settings.py → INSTALLED_APPS ga \'students\' qo‘shing', lang: 'bash' },
        { code: "# students/models.py\nclass Group(models.Model):\n    name = models.CharField(max_length=20, unique=True)\n    faculty = models.CharField(max_length=100)\n    def __str__(self): return self.name\n\nclass Student(models.Model):\n    full_name = models.CharField('F.I.Sh.', max_length=100)\n    email = models.EmailField(unique=True)\n    gpa = models.DecimalField(max_digits=3, decimal_places=2, null=True, blank=True)\n    group = models.ForeignKey(Group, on_delete=models.SET_NULL, null=True, blank=True)\n\n# students/forms.py\nclass StudentForm(forms.ModelForm):\n    class Meta:\n        model = Student\n        fields = ['full_name', 'email', 'gpa', 'group']\n\n# students/views.py — sinfga asoslangan umumiy view lar bilan to‘liq CRUD\nfrom django.urls import reverse_lazy\nfrom django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView\n\nclass StudentList(ListView):\n    model = Student\n    paginate_by = 10\n    queryset = Student.objects.select_related('group').order_by('full_name')\n\nclass StudentDetail(DetailView):\n    model = Student\n\nclass StudentCreate(CreateView):\n    model = Student\n    form_class = StudentForm\n    success_url = reverse_lazy('student_list')\n\nclass StudentUpdate(UpdateView):\n    model = Student\n    form_class = StudentForm\n    success_url = reverse_lazy('student_list')\n\nclass StudentDelete(DeleteView):\n    model = Student\n    success_url = reverse_lazy('student_list')\n\n# students/urls.py\nurlpatterns = [\n    path('', views.StudentList.as_view(), name='student_list'),\n    path('<int:pk>/', views.StudentDetail.as_view(), name='student_detail'),\n    path('create/', views.StudentCreate.as_view(), name='student_create'),\n    path('<int:pk>/edit/', views.StudentUpdate.as_view(), name='student_update'),\n    path('<int:pk>/delete/', views.StudentDelete.as_view(), name='student_delete'),\n]", lang: 'python' },
        { code: "{# students/templates/students/student_form.html #}\n<form method=\"post\">\n  {% csrf_token %}\n  {{ form.as_p }}\n  <button>Saqlash</button>\n</form>", lang: 'html' },
        { code: 'python manage.py makemigrations && python manage.py migrate\npython manage.py createsuperuser\npython manage.py runserver\n# Bonus: students/admin.py → admin.site.register(Student) — /admin da tayyor CRUD', lang: 'bash' }
      ]
    }
  ],
  tasks: [
    {
      title: 'Guruhlar CRUD',
      level: 'easy',
      blocks: ['`groups` uchun ham to‘liq CRUD yarating; guruh sahifasida uning talabalari ro‘yxati ko‘rinsin. Talabasi bor guruhni o‘chirishda ogohlantirish chiqsin.']
    },
    {
      title: 'Autentifikatsiya',
      level: 'medium',
      blocks: ['Laravel Breeze (`composer require laravel/breeze --dev`, `php artisan breeze:install blade`) yoki Django `LoginView` bilan tizimga kirishni qo‘shing: ro‘yxatni hamma ko‘radi, qo‘shish/tahrirlash/o‘chirish faqat kirganlar uchun (`auth` middleware / `LoginRequiredMixin`).']
    },
    {
      title: 'Variant bo‘yicha CRUD ilova',
      level: 'hard',
      blocks: ['A10 dagi variant bazangiz uchun tanlangan freymvorkda kamida 2 ta bog‘langan resurs bo‘yicha to‘liq CRUD (validatsiya, sahifalash, qidiruv, flash xabarlar, CSRF) va JSON API yarating. Loyihani GitHub ga joylang va README da ishga tushirish yo‘riqnomasini yozing.']
    }
  ],
  report: [
    'Ishning mavzusi, tanlangan freymvork va maqsad.',
    'Migratsiya, model, kontroller (view), marshrutlar va shablonlar kodi.',
    '`route:list` (yoki `urls.py`) natijasi.',
    'Har bir CRUD amali skrinshoti, validatsiya xatolari va flash xabarlar.',
    'CSRF tajribasi (token olib tashlanganda natija).',
    'GitHub repozitoriyasiga havola.',
    'Nazorat savollariga javoblar.'
  ],
  criteria: [
    ['Loyiha va baza sozlangan, migratsiya va seeder ishlaydi', '1'],
    ['Model va munosabatlar, mass assignment himoyasi', '1'],
    ['To‘liq CRUD: marshrutlar, kontroller, shablonlar', '1'],
    ['Validatsiya, CSRF, sahifalash va qidiruv', '1'],
    ['Mustaqil topshiriq bajarilgan va himoya qilingan', '1'],
    ['**Jami**', '**5**']
  ],
  questions: [
    'CRUD qisqartmasi nimani anglatadi va har bir amalga qaysi HTTP metodi mos keladi?',
    'Migratsiya nima uchun kerak? `migrate:fresh --seed` nima qiladi?',
    'Mass assignment zaifligi nima va `$fillable` undan qanday himoya qiladi?',
    'Route model binding qanday ishlaydi?',
    'Form Request klassining afzalligi nimada?',
    'HTML forma PUT va DELETE so‘rovlarini qanday yuboradi?',
    '`@csrf` / `{% csrf_token %}` nima uchun kerak?',
    'Laravel Eloquent va Django ORM da `with()` / `select_related()` qanday muammoni hal qiladi?'
  ]
};
