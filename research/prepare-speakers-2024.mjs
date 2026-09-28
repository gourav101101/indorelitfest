import fs from 'node:fs/promises';
import sharp from 'sharp';
import {getDocument} from './.pdf-extract-tools/node_modules/pdfjs-dist/legacy/build/pdf.mjs';
import {createCanvas} from './.pdf-extract-tools/node_modules/@napi-rs/canvas/index.js';

// Source-derived biographies: English text preserved, image-only Hindi abridged.
// Keep the page mapping for editorial review; never infer an edition from a name.
const records = [
 ['manoj-muntashir-shukla','Manoj Muntashir Shukla',2,'Lyricist, poet & screenwriter','Lyricist, Poet, Dialogue Writer,'],
 ['priya-malik','Priya Malik',4,'Poet, storyteller & actor','Poet, Storyteller, Actor'],
 ['laxmi-narayan-tripathi','Dr. Laxmi Narayan Tripathi',6,'Activist, dancer & motivational speaker','Transgender Activist, Bollywood Actress,'],
 ['thomas-mathew','Dr. Thomas Mathew',8,'Author & retired IAS officer','Author, Retd. IAS Officer,'],
 ['neelima-dalmia-adhar','Neelima Dalmia Adhar',10,'Author','Author \nNEELIMA'],
 ['buddhinath-mishra','डॉ. बुद्धिनाथ मिश्र',12,'हिन्दी और मैथिली कवि',null,'डॉ. बुद्धिनाथ मिश्र हिन्दी और मैथिली के कवि हैं। बिहार के समस्तीपुर में जन्मे मिश्र जी ने अपनी प्रारंभिक शिक्षा काशी में प्राप्त की और बनारस हिन्दू विश्वविद्यालय से अध्ययन किया। उन्होंने कविता, गीत लेखन और साहित्य सेवा में लंबा योगदान दिया है।\n\nराजभाषा विशेषज्ञ के रूप में उन्होंने विभिन्न संस्थाओं में काम किया। उनके गीत संग्रहों में ‘आग का रथ’, ‘ऋतुराज एक पल को’ और ‘शिखर संगीत’ शामिल हैं। उनकी रचनाएँ साहित्य और जनजीवन से जुड़ी अनुभूतियों को स्वर देती हैं।'],
 ['neelotpal-mrinal','नीलोत्पल मृणाल',13,'लेखक, कवि और लोक गायक',null,'नीलोत्पल मृणाल भारतीय लेखक, कवि और सामाजिक-राजनीतिक कार्यकर्ता हैं। उनका पहला उपन्यास ‘डार्क हॉर्स’ हिन्दी माध्यम से पढ़े ग्रामीण युवाओं के जीवन और शहर में जीवन सँवारने के संघर्ष को चित्रित करता है। इस पुस्तक के लिए उन्हें 2016 में साहित्य अकादमी युवा पुरस्कार मिला।\n\nउनकी अन्य पुस्तकों में ‘औघड़’ और ‘यार जादूगर’ शामिल हैं। लेखन के साथ वे कविता और लोकगीतों में भी सक्रिय हैं तथा सामाजिक और राजनीतिक परिवर्तन के लिए काम करते हैं।'],
 ['sanjeev-paliwal','Sanjeev Paliwal',14,'Hindi writer, novelist & journalist','Hindi Writer, Novelist, Journalist,'],
 ['manoj-rajan-tripathi','Manoj Rajan Tripathi',16,'Journalist, novelist & screenwriter','Journalist, Novelist, Screenwriter,'],
 ['amrut-deshmukh','Amrut Deshmukh',18,'Booklet founder & social entrepreneur','Founder of the "Booklet" app,'],
 ['ishinna-sadana','Dr. Ishinna B. Sadana',20,'Author & parenting expert','Author, Child Psychologist,'],
 ['ashdin-doctor','Ashdin Doctor',22,'Habit coach, speaker & author','Wellness Expert, Motivational'],
 ['nita-menezes','Nita Menezes',24,'Author & financial literacy expert','Founder, CEO - Financially Smart &'],
 ['babusha-kohli','बाबुषा कोहली',25,'कवि और लेखक',null,'बाबुषा कोहली कवयित्री और लेखिका हैं, जो जबलपुर में कार्यरत हैं। उनके पहले कविता-संग्रह ‘प्रेम गिलहरी दिल अखरोट’ को 2014 का भारतीय ज्ञानपीठ नवलेखन पुरस्कार मिला। उनकी अन्य पुस्तकों में ‘बावन चिट्ठियाँ’, ‘भाप के घर में शीशे की लड़की’ और ‘उस वक्त का नाम असंभव है’ शामिल हैं।\n\nउनकी कविताओं का कई भारतीय और विदेशी भाषाओं में अनुवाद हुआ है। कविता के साथ वे संगीत, रंगमंच और सिनेमा में भी रुचि रखती हैं।'],
 ['chandan-rai','चंदन राय',26,'कवि, लेखक और गीतकार',null,'चंदन राय कवि, लेखक और गीतकार हैं। वे प्रेम, पीड़ा और जीवन की अनुभूतियों को अपनी कविताओं और मुक्तकों में व्यक्त करते हैं। उन्होंने कम उम्र से ही गीत और कविताएँ लिखना शुरू किया तथा बाद में मंचों पर काव्य पाठ करने लगे।\n\nवे भारत और विदेशों के हिन्दी कवि सम्मेलनों में भाग ले चुके हैं। उनकी कविताओं और गीतों में संवेदना तथा शब्दों की सुगमता प्रमुख है।'],
 ['aman-akshar','अमन अक्षर',27,'कवि और गीतकार',null,'अमन अक्षर का जन्म मध्यप्रदेश के खंडवा क्षेत्र के छोटे से गाँव मुंदी में हुआ। गाँव और बाद में इंदौर में पढ़ाई के दौरान उन्होंने हिन्दी साहित्य और गीत लेखन में रुचि विकसित की। वे कवि सम्मेलनों में अपने गीतों के लिए जाने जाते हैं।\n\nउनके गीत ‘भाषा सिर्फ राम है’ को व्यापक पहचान मिली। उन्होंने ‘सिया राममय’ वेब सीरीज के लिए गीत लेखन भी किया है और सामाजिक कार्यों से जुड़े हैं।'],
 ['megha-parmar','Megha Parmar',28,'Mountaineer & technical scuba diver','1st Woman from Madhya Pradesh to'],
 ['brajesh-rajput','Brajesh Rajput',30,'Author, journalist & motivational speaker','Author, Journalist,'],
 ['manu-vaishali','मनु वैशाली',32,'कवयित्री और गीतकार',null,'मनु वैशाली कवयित्री और गीतकार हैं, जो विभिन्न राष्ट्रीय मंचों पर काव्य पाठ कर चुकी हैं। बचपन से तुकबंदी करने वाली मनु ने 2021 के बाद मंचीय कविता की यात्रा शुरू की। उनके गीत सोशल मीडिया पर भी लोकप्रिय हुए।\n\nवे शृंगार रस के गीत और छंद रचती हैं तथा अन्य विषयों पर भी लिखती हैं। वर्ष 2023 में उन्हें हिन्दी साहित्य अकादमी का युवा आइकन अवॉर्ड मिला।'],
 ['suman-gurjar','सुमन गुर्जर',33,'पुलिस अधिकारी और लेखिका',null,'सुमन गुर्जर पुलिस अधिकारी और लेखिका हैं। उनका जन्म मध्यप्रदेश के जौरा में हुआ और उन्होंने इंदिरा गांधी राष्ट्रीय मुक्त विश्वविद्यालय से इतिहास में स्नातक किया। 1998 में मध्यप्रदेश पुलिस में शामिल होने के बाद उन्होंने विभिन्न भूमिकाओं में काम किया।\n\nलेखन से उनका पुराना लगाव है। वे कविताओं और लघु रचनाओं के माध्यम से अनुभवों को अभिव्यक्त करती हैं। उनकी रचनाएँ समाचार पत्रों और पत्रिकाओं में प्रकाशित हुई हैं तथा आकाशवाणी और शिवपुरी एफएम पर प्रसारित हुई हैं।'],
 ['pallavi-trivedi','पल्लवी त्रिवेदी',34,'पुलिस अधिकारी और लेखिका',null,'पल्लवी त्रिवेदी ने 2000 में उप पुलिस अधीक्षक के रूप में मध्यप्रदेश पुलिस सेवा में प्रवेश किया। पुलिस सेवा के साथ वे लेखन और साहित्यिक गतिविधियों में सक्रिय रही हैं। उनकी प्रकाशित पुस्तकों में व्यंग्य, कविता और यात्रा संस्मरण शामिल हैं।\n\nउन्हें यात्राओं, संगीत और फोटोग्राफी में भी रुचि है। साहित्यिक योगदान के लिए उन्हें 2020 में मध्यप्रदेश का वागीश्वरी सम्मान मिला।'],
 ['manisha-pathak-soni','मनीषा पाठक सोनी',35,'पुलिस अधिकारी और लेखिका',null,'मनीषा पाठक सोनी 1998 बैच की राज्य पुलिस सेवा अधिकारी हैं। उन्होंने देवी अहिल्या विश्वविद्यालय से लोक सेवा में उत्कृष्टता के लिए शोध किया। पर्यावरण के क्षेत्र में उनके प्रयासों को भी सम्मान मिला है।\n\nउनकी पुस्तकों में ‘सारथी साथी’ और ‘लैंगिक अपराधों की वैज्ञानिक विवेचना’ शामिल हैं। उन्होंने अन्य लेखकों की पुस्तकों का प्रकाशन भी कराया है। साहित्य सेवा के लिए उन्हें कई पुरस्कार मिले हैं।'],
 ['naveen-krishna-rai','Naveen Krishna Rai',36,'Author, government advisor & trainer','Author, Sr. Manager IIM Indore,'],
];
const source=JSON.parse(await fs.readFile('research/legacy-audit-2026-09-26/speakers-2024-extracted.json','utf8'));
const pdf=await getDocument({data:new Uint8Array(await fs.readFile('public/legacy/Speakers 2024 - Indore Literature Festival.pdf')),useSystemFonts:true}).promise;
await fs.mkdir('public/images/speakers/2024',{recursive:true});
const speakers=[];
for(const [slug,name,pageNumber,role,marker,hindiBio] of records) {
 const page=await pdf.getPage(pageNumber),viewport=page.getViewport({scale:3});
 const canvas=createCanvas(Math.ceil(viewport.width),Math.ceil(viewport.height));
 await page.render({canvasContext:canvas.getContext('2d'),viewport}).promise;
 // The source uses a consistent portrait box at x=34..143, y=21..186
 // on the 418px-wide preview. Extract that box from a larger render.
 const ratio=canvas.width/418;
 await sharp(canvas.toBuffer('image/png')).extract({left:Math.round(34*ratio),top:Math.round(21*ratio),width:Math.round(109*ratio),height:Math.round(165*ratio)}).resize({width:436,withoutEnlargement:true}).webp({quality:90}).toFile(`public/images/speakers/2024/${slug}.webp`);
 let biography=hindiBio;
 if(!biography){const raw=source.pages[pageNumber-1].text;const end=raw.lastIndexOf(marker);if(end<0)throw new Error(`Missing biography boundary: ${slug}`);biography=raw.slice(0,end).replace(/\s+/gu,' ').trim();}
 speakers.push({slug,name,year:2024,role,image:`/images/speakers/2024/${slug}.webp`,paragraphs:biography.split('\n\n'),hindi:[],source_pages:[pageNumber],biography_language:hindiBio?'hi':'en'});
}
await fs.writeFile('resources/data/speakers-2024.json',JSON.stringify({year:2024,source:source.source,editorial_note:'Biographies describe the 2024 edition. Image-only Hindi biographies are abridged from source pages; English biographies preserve source wording. Portraits extracted from the source PDF.',speakers},null,2)+'\n');
console.log(`Prepared ${speakers.length} profiles and portraits.`);
