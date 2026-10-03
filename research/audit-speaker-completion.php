<?php
require __DIR__.'/../vendor/autoload.php';
$app = require __DIR__.'/../bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();
$people = (new App\Support\SpeakerDirectory())->confirmed();
echo json_encode(['profiles'=>count($people), 'with_biography'=>count(array_filter($people, fn($p)=>count($p['paragraphs'])>0)), 'without_biography'=>array_values(array_map(fn($p)=>['slug'=>$p['slug'],'name'=>$p['name']],array_filter($people, fn($p)=>count($p['paragraphs'])===0))), 'without_portrait'=>count(array_filter($people,fn($p)=>empty($p['image'])))],JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE);
