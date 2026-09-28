import fs from 'node:fs/promises';
// Original translations of the supplied 2024 brochure text. Historical roles
// remain in their edition context; these are not updated professional claims.
const hindi={
'manoj-muntashir-shukla':`राष्ट्रीय पुरस्कार विजेता मनोज मुंतशिर शुक्ला बॉलीवुड के गीतकार, कवि और पटकथा लेखक हैं। उन्होंने मुंबई में ‘कौन बनेगा करोड़पति’ के लेखन से शुरुआत की और आगे चलकर फिल्म तथा टेलीविजन जगत में अपनी पहचान बनाई। 2024 के परिचय के अनुसार उनके काम में 80 से अधिक फिल्में और 750 गीत शामिल हैं। ‘तेरी मिट्टी’, ‘लुट गए’, ‘तेरी गलियाँ’, ‘तेरे संग यारा’, ‘कौन तुझे’, ‘मैं फिर भी तुमको चाहूँगा’, ‘मेरे रश्के कमर’ और ‘देखते देखते’ उनके लोकप्रिय गीतों में हैं।

उन्होंने ‘बाहुबली’ की दोनों फिल्मों के गीत और संवाद भी लिखे। ‘इंडियन आइडल’ में उनकी प्रस्तुतियाँ और माँ तथा मातृभूमि को समर्पित कविताएँ लोकप्रिय रही हैं। वे अनेक अंतरराष्ट्रीय मंचों पर भारतीयता और देशप्रेम की भावना को स्वर दे चुके हैं। दो लोकप्रिय पुस्तकों के लेखक मनोज स्वयं को ‘शब्दयोगी’ कहते हैं। गीत और कहानी के माध्यम से वे भारतीय सिनेमा की अभिव्यक्ति को समृद्ध करते रहे हैं।`,
'priya-malik':`प्रिया मलिक पुरस्कार प्राप्त स्पोकन वर्ड कवयित्री, कथाकार और अभिनेत्री हैं। वे अंग्रेज़ी, हिन्दी और उर्दू में लिखती और प्रस्तुतियाँ देती हैं। प्रेम और रिश्ते उनके लेखन के प्रमुख विषय हैं। उनकी रचनाएँ Kommune, UnErase Poetry, Spill Poetry और Tape A Tale जैसे मंचों पर प्रस्तुत हुई हैं। वे जश्न-ए-रेख्ता, साहित्य आज तक और टाइम्स लिटरेचर फेस्टिवल के साथ अंतरराष्ट्रीय उत्सव Colomboscope में भी आमंत्रित रही हैं।

उनका काम Grazia, Femina और Cosmopolitan जैसी पत्रिकाओं में प्रकाशित हुआ और वे Cosmopolitan India के आवरण पर भी दिखाई दीं। उन्होंने Google, Amazon, Hotstar और Sony सहित कई ब्रांडों के लिए लेखन किया है। उनकी कविता ‘मैं 2019 में 1999 ढूँढ़ रही हूँ’ व्यापक रूप से लोकप्रिय हुई। संगीत और कविता को साथ लाने वाला उनका एकल कार्यक्रम ‘इश्क़ है’ भारत के अनेक शहरों में प्रस्तुत किया गया।

2024 के इस परिचय में उनके हिन्दी और अंग्रेज़ी प्रेम-कविता संग्रह ‘इश्क़ के सात पड़ाव’ और ‘For Those Who Love Too Much’ उसी वर्ष प्रकाशन के लिए प्रस्तावित बताए गए थे।`,
'laxmi-narayan-tripathi':`आचार्य महामंडलेश्वर डॉ. लक्ष्मी नारायण त्रिपाठी मुंबई की ट्रांसजेंडर अधिकार कार्यकर्ता, अभिनेत्री, भरतनाट्यम नृत्यांगना और प्रेरक वक्ता हैं। 13 दिसंबर 1978 को ठाणे में जन्मीं लक्ष्मी ने 2008 में संयुक्त राष्ट्र में एशिया प्रशांत क्षेत्र का प्रतिनिधित्व किया। उन्होंने मिठीबाई कॉलेज से कला में स्नातक और भरतनाट्यम में स्नातकोत्तर शिक्षा प्राप्त की।

मुंबई के डांस बार बंद किए जाने के विरोध से उनकी सक्रियता ने LGBTQIA+ अधिकारों के प्रति दीर्घ प्रतिबद्धता का रूप लिया। 2002 में वे DAI Welfare Society की अध्यक्ष बनीं और बाद में यौन अल्पसंख्यकों के समर्थन के लिए ‘अस्तित्व’ संस्था की स्थापना की। उनके प्रयास ट्रांसजेंडर समुदाय की पहचान और अधिकारों की लड़ाई से जुड़े रहे, जिसमें 2014 का सर्वोच्च न्यायालय का ऐतिहासिक निर्णय महत्वपूर्ण पड़ाव था।

‘बिग बॉस’ और ‘सच का सामना’ जैसे कार्यक्रमों में उनकी स्पष्टवादिता ने सामाजिक बाधाओं और हिजड़ा समुदाय के अधिकारों पर संवाद बढ़ाया। 2016 में उनकी सहलिखित जीवनी ‘Red Lipstick’ प्रकाशित हुई। किन्नर अखाड़े की आचार्य महामंडलेश्वर के रूप में वे आध्यात्मिक क्षेत्रों में भी ट्रांस समुदाय की भागीदारी के लिए कार्य करती हैं।`,
'thomas-mathew':`डॉ. थॉमस मैथ्यू सेवानिवृत्त आईएएस अधिकारी, लेखक, कॉरपोरेट रणनीतिकार और रक्षा विश्लेषक हैं। उन्होंने जवाहरलाल नेहरू विश्वविद्यालय से अंतरराष्ट्रीय संबंधों में डॉक्टरेट और दिल्ली विश्वविद्यालय से विधि की डिग्री प्राप्त की। वित्त, रक्षा और उद्योग मंत्रालयों में उनके कार्यों में भारत की रक्षा ऑफसेट नीति तथा 2012 में भारतीय पूँजी बाजार में Qualified Foreign Investors योजना का क्रियान्वयन शामिल है।

उनकी पुस्तकों में ‘Ratan Tata: A Life’, ‘In Search of Congruence: India-US Relations under the Obama Administration’, ‘The Winged Wonders of Rashtrapati Bhavan’ और ‘Abode Under the Dome’ शामिल हैं। अंतिम दो पुस्तकें राष्ट्रपति प्रणब मुखर्जी ने बराक ओबामा और शी जिनपिंग जैसे विश्व नेताओं को भेंट की थीं।

फोटोग्राफी में गहरी रुचि रखने वाले डॉ. मैथ्यू ने 500 से अधिक पक्षी प्रजातियों की तस्वीरें ली हैं। उनका काम ललित कला अकादमी के प्रकाशनों और राष्ट्रपति की आधिकारिक नववर्ष शुभकामनाओं में भी प्रयुक्त हुआ। रणनीति और अंतरराष्ट्रीय मामलों से समय मिलने पर वे वन्यजीव अभयारण्यों में अपने 600 मिमी लेंस के साथ तस्वीरें लेते हैं।`,
'neelima-dalmia-adhar':`नीलिमा डालमिया आधार भारतीय लेखिका हैं, जिनकी रचनाएँ परिवार, समाज और मानवीय व्यवहार की जटिलताओं का अन्वेषण करती हैं। उद्योगपति रामकृष्ण डालमिया और पद्म भूषण सम्मानित कवयित्री दिनेश नंदिनी डालमिया की पुत्री नीलिमा नई दिल्ली में छह भाई-बहनों के साथ पली-बढ़ीं। कॉन्वेंट ऑफ जीसस एंड मैरी में पढ़ने के बाद उन्होंने दिल्ली विश्वविद्यालय से मनोविज्ञान में स्नातकोत्तर किया और वहाँ अध्यापन भी किया।

उनकी पहली पुस्तक ‘Father Dearest: The Life and Times of R.K. Dalmia’ पारिवारिक इतिहास और छिपे प्रसंगों का लोकप्रिय वृत्तांत बनी। दूसरी पुस्तक ‘Merchants of Death’ मारवाड़ी समाज के अंतर्संबंधों और लंबे समय से चली आ रही चुप्पियों की पड़ताल करती है। ‘The Secret Diary of Kasturba’ में वे कस्तूरबा गांधी के जीवन की झलक प्रस्तुत करती हैं।

मानवीय व्यवहार की सूक्ष्म पर्यवेक्षक नीलिमा के लेखन में व्यक्तित्व के असामान्य, रहस्यमय और अप्रत्याशित पक्ष सामने आते हैं। उनकी रचनाएँ पाठकों को परिवार और समाज के परिचित ढाँचों पर नए दृष्टिकोण से विचार करने का अवसर देती हैं।`,
'sanjeev-paliwal':`संजीव पालीवाल हिन्दी लेखक और पत्रकार हैं। तीन दशकों से अधिक के करियर में उन्होंने हिन्दी टेलीविजन पत्रकारिता में महत्वपूर्ण योगदान दिया। दैनिक जागरण, अमर उजाला और आज जैसे समाचार पत्रों के साथ उन्होंने दूरदर्शन, BITV, IBN7/News18 और TV Today समूह में काम किया। 2024 के परिचय में वे आज तक के वरिष्ठ कार्यकारी संपादक के रूप में उल्लिखित हैं।

उनका लेखन पाठकों को विचार करने और धारणाओं पर प्रश्न उठाने के लिए प्रेरित करता है। पहला उपन्यास ‘नैना’ उनके कथा-साहित्य की यात्रा का महत्वपूर्ण पड़ाव है। पत्रकारिता और साहित्य, दोनों में वे अपने समय और समाज को देखने का एक विशिष्ट दृष्टिकोण प्रस्तुत करते हैं।`,
'manoj-rajan-tripathi':`मनोज राजन त्रिपाठी मीडिया, लेखन और मनोरंजन के क्षेत्र में सक्रिय हैं। 2024 के परिचय में उनका मीडिया अनुभव 27 वर्ष से अधिक बताया गया है। उन्होंने दैनिक जागरण से करियर शुरू किया और Network18, India News, News World India तथा HT Media जैसे संस्थानों में लगभग 15 वर्ष संपादकीय भूमिकाएँ निभाईं। वे The Quint, News18 Hindi और हिन्दुस्तान जैसे मंचों के लिए नियमित स्तंभ लिखते रहे हैं।

उत्तर प्रदेश सरकार से मान्यता प्राप्त पत्रकार मनोज को मंच संचालन के लिए भी पहचान मिली, विशेषकर दैनिक जागरण के ‘संवादी’ कार्यक्रम में। संवाद लेखक के रूप में उन्होंने 2017 की फिल्म ‘Guest in London’ में योगदान दिया। वे ज़ी टीवी ‘सा रे गा मा पा’ और ‘क्लोज़-अप अंताक्षरी’ के फाइनलिस्ट भी रहे हैं।

उनका उपन्यास ‘Code Kakori’ स्वतंत्रता सेनानियों की ऐतिहासिक काकोरी कार्रवाई से प्रेरित है। उनका विविध कार्यक्षेत्र पत्रकारिता, कथा-लेखन, संगीत और मंचीय प्रस्तुति को जोड़ता है।`,
'amrut-deshmukh':`‘द बुकलेट गाइ’ के नाम से परिचित अमृत देशमुख सामाजिक उद्यमी हैं, जिनका उद्देश्य भारत में पढ़ने की आदत को बढ़ावा देना है। पेशे से चार्टर्ड अकाउंटेंट अमृत ने फंड मैनेजर के सफल करियर से आगे बढ़कर पुस्तकों और उद्यमिता के प्रति अपने लगाव को चुना। उनकी पहल ‘Booklet – Mission Make India Read’ कम समय वाले पाठकों तक संक्षिप्त पुस्तक-सार पहुँचाती है।

बचपन में उनके भाई ने उन्हें पुस्तकों से परिचित कराया। पढ़ने के प्रभाव ने उन्हें उद्यमिता की ओर प्रेरित किया। तीन स्टार्टअप की असफलता के बाद भी पुस्तकों से जुड़ाव ने उन्हें Booklet बनाने की दिशा दी। इस ऐप में लगभग 20 मिनट के पुस्तक-सार और एक मिनट के ‘Tiny Booklets’ उपलब्ध कराए जाते हैं।

उनका दृष्टिकोण निजी अनुभवों तथा नेल्सन मंडेला और महात्मा गांधी जैसे नेताओं के विचारों से प्रभावित है। वे उन लोगों तक ज्ञान पहुँचाना चाहते हैं जिनके पास पूरी पुस्तक पढ़ने का समय कम है, ताकि पढ़ना हर भारतीय की आदत बने।`,
'ishinna-sadana':`डॉ. इशिन्ना बी. सदाना बाल मनोवैज्ञानिक, लेखिका और पेरेंटिंग विशेषज्ञ हैं। उनकी पुस्तक ‘Power to the Parent’ अभिभावकों को बच्चों से संबंध बेहतर बनाने में सहायता करती है। वे माता-पिता की चिंताओं, संदेहों और आशंकाओं को समझने के लिए सहानुभूतिपूर्ण और बिना निर्णय सुनाए संवाद का स्थान देती हैं।

उनका दृष्टिकोण व्यावहारिक समाधान और भावनात्मक समझ को जोड़ता है। सरल लेखन, वास्तविक उदाहरण और अध्ययन अभिभावकों को ऐसे उपाय देते हैं जिन्हें वे रोज़मर्रा में अपना सकते हैं। वे विभिन्न परिस्थितियों में बच्चों के साथ व्यवहार और उनके भावनात्मक तथा विकास संबंधी सहयोग पर मार्गदर्शन देती हैं।

उनका उद्देश्य बच्चों के साथ मजबूत रिश्ते बनाने के साथ अभिभावकों का आत्मविश्वास और खुशी बढ़ाना है। वे परिवारों को अधिक प्रसन्न और भावनात्मक रूप से सक्षम बनने में सहायता करना चाहती हैं।`,
'ashdin-doctor':`‘द हैबिट कोच’ अश्दीन डॉक्टर स्वास्थ्य एवं जीवनशैली विशेषज्ञ, प्रेरक वक्ता और लेखक हैं। तनाव, खराब स्वास्थ्य और अत्यधिक थकान के अनुभव ने उन्हें जीवनशैली बदलने के लिए प्रेरित किया। इसी यात्रा से Awesome180 बना, जो लोगों को बाधक आदतों से बाहर निकलकर उत्पादकता, स्वास्थ्य और संतुष्टि बढ़ाने वाली आदतें बनाने में सहायता करता है।

आदत निर्माण के उनके तीन प्रमुख नियम हैं: बहुत छोटा कदम चुनें, उसे अत्यंत आसान बनाएं और लगातार दो दिन कभी न छोड़ें। अपने पॉडकास्ट, कोचिंग और Audible ऑडियोबुक ‘Change Your Habits, Change Your Life’ में वे बाधाएँ पार करने, आत्म-अनुशासन विकसित करने और अपनी क्षमता पहचानने के उपाय साझा करते हैं।

अपने जीवन में आदत परिवर्तन का प्रभाव अनुभव करने के बाद वे दूसरों को अधिक स्वस्थ और उद्देश्यपूर्ण जीवन की दिशा में कदम उठाने के लिए प्रेरित करते हैं।`,
'nita-menezes':`नीता मेनेज़ेस वित्तीय विशेषज्ञ और लेखिका हैं, जिनका व्यक्तिगत वित्त, वित्तीय साक्षरता और सशक्तीकरण में तीन दशकों से अधिक का अनुभव है। वे ‘Be Financially Smart – The Modern Woman’s Guide to Money’ की लेखिका और Financially Smart तथा Money Prastha की संस्थापक हैं। उनका काम विशेष रूप से महिलाओं और युवा वयस्कों को वित्तीय विषयों की बेहतर समझ देने पर केंद्रित है।

Certified Financial Planner के रूप में वे जानकारी पर आधारित निर्णय, वित्तीय स्वतंत्रता और दीर्घकालिक तैयारी पर मार्गदर्शन देती हैं। 2024 के परिचय के अनुसार वे WICCI Financial Literacy & Management Council की राष्ट्रीय अध्यक्ष और G100 Club के Financial Empowerment क्षेत्र की India Country Chair हैं।

उनकी पहलों में वित्तीय शिक्षा और व्यक्तिगत पहचान के विकास को साथ रखा जाता है। व्यावहारिक समझ और सहानुभूतिपूर्ण मार्गदर्शन से वे लोगों को अपने वित्तीय भविष्य की योजना बनाने में सहायता करती हैं।`,
'megha-parmar':`मध्यप्रदेश के सीहोर जिले के भोज नगर गाँव की मेघा परमार ने 22 मई 2019 को माउंट एवरेस्ट पर पहुँचकर प्रदेश की पहली महिला एवरेस्ट विजेता बनने का इतिहास रचा। किसान परिवार में जन्मीं मेघा ने सामाजिक दबाव और आर्थिक चुनौतियों के बावजूद पर्वतारोहण का अपना सपना बनाए रखा। 2018 के असफल प्रयास के बाद उन्होंने प्रशिक्षण और संकल्प को और मजबूत किया। परिवार और प्रायोजकों के सहयोग से वे विश्व की सबसे ऊँची चोटी तक पहुँचीं।

चढ़ाई के बाद वापसी भी कठिन रही। हिमांधता और अत्यंत कठिन परिस्थितियों के बीच उन्होंने साहस और दृढ़ता दिखाई। उनकी यात्रा केवल शिखर तक पहुँचने की नहीं, बाधाओं से लड़ने की भी कहानी है।

2024 के परिचय में उनका उद्देश्य निम्न-मध्यमवर्गीय परिवारों की लड़कियों को बड़े सपने देखने के लिए प्रेरित करना और पर्वतारोहण का प्रशिक्षण देना बताया गया है। वे सातों महाद्वीपों की सबसे ऊँची चोटियों पर चढ़ना और अपनी यात्रा से दूसरों का साहस बढ़ाना चाहती हैं।`,
'brajesh-rajput':`ब्रजेश राजपूत भोपाल के लेखक, पत्रकार और प्रेरक वक्ता हैं। उनकी पुस्तक ‘The Everest Girl’ मध्यप्रदेश की पहली महिला एवरेस्ट विजेता मेघा परमार की जीवनी है। इसमें मेघा के संघर्ष, सपनों और दुनिया की सबसे ऊँची चोटी तक पहुँचने के दृढ़ संकल्प का वर्णन है।

उनका लेखन साहस, उपलब्धि और सशक्तीकरण को संवेदनशील कथा के माध्यम से प्रस्तुत करता है। पात्रों का चित्रण और भावनात्मक जुड़ाव पाठकों को संघर्ष तथा संभावनाओं पर विचार करने के लिए प्रेरित करता है। लेखन के अतिरिक्त वे देश के विभिन्न संस्थानों में अपने अनुभव और विचार साझा करते हैं, जिससे श्रोताओं को दृढ़ता के साथ अपने लक्ष्य की ओर बढ़ने का प्रोत्साहन मिलता है।`,
'naveen-krishna-rai':`नवीन कृष्ण राय स्व-सहायता पुस्तक ‘Life Management’ के लेखक हैं। 2024 के परिचय में वे भारतीय प्रबंध संस्थान, इंदौर में सरकारी मामलों के वरिष्ठ प्रबंधक के रूप में उल्लिखित हैं। उन्हें लोकतंत्र के चारों स्तंभों—कार्यपालिका, विधायिका, न्यायपालिका और मीडिया—से जुड़े क्षेत्रों में प्रत्यक्ष कार्यानुभव मिला है। उन्होंने वामपंथी उग्रवाद प्रभावित क्षेत्रों में लगभग एक वर्ष रहकर ग्रामीण भारत के सामाजिक मुद्दों पर सरकारी संस्थानों के साथ काम किया।

वे भारतीय राजस्व सेवा, राज्य पुलिस, प्रशासनिक और न्यायिक सेवाओं तथा अर्धसैनिक बलों के कर्मियों को प्रशिक्षण देते हैं। परिचय के अनुसार उन्होंने जीवन प्रबंधन, नेतृत्व, जन-प्रबंधन, आत्म-प्रबंधन, वार्ता, संघर्ष प्रबंधन और निर्णय क्षमता जैसे विषयों पर पाँच हजार से अधिक कर्मियों को प्रशिक्षित किया था। वे पुलिस प्रशिक्षण, सुशासन, महिला एवं बाल कल्याण, शहरी और ग्रामीण विकास, औद्योगिक विकास, ई-गवर्नेंस तथा उद्यमिता पर संस्थानों को सलाह देते हैं।

उनकी भूमिकाओं में डॉ. एपीजे अब्दुल कलाम तकनीकी विश्वविद्यालय, लखनऊ के Incubation Hub का परामर्श, लखनऊ जिला उद्योग बंधु समिति में विशेष आमंत्रित सदस्यता तथा मध्यप्रदेश पुलिस के PTRI की प्रशिक्षण मॉड्यूल चयन समिति की सदस्यता शामिल रही है। वे हरदा की ई-गवर्नेंस और बाल कल्याण समितियों, फिरोजाबाद-शिकोहाबाद विकास प्राधिकरण और लखनऊ विश्वविद्यालय की Institutional Innovation Council से भी जुड़े रहे हैं।`
};
const english={
'buddhinath-mishra':`Dr. Buddhinath Mishra is a Hindi and Maithili poet. Born in Samastipur, Bihar, he received his early education in Kashi and studied at Banaras Hindu University. His work spans poetry, song writing and literary service.

He has worked as an official-language specialist in several institutions. His collections include Aag Ka Rath, Rituraj Ek Pal Ko and Shikhar Sangeet. His writing gives voice to experiences rooted in literature and everyday life.`,
'neelotpal-mrinal':`Neelotpal Mrinal is an Indian writer, poet and social-political activist. His debut novel Dark Horse follows Hindi-medium students from rural backgrounds as they navigate life and their ambitions in the city. The book received the Sahitya Akademi Yuva Puraskar in 2016.

His other books include Aughad and Yaar Jadugar. Alongside writing, he participates in poetry and folk singing and works towards social and political change.`,
'babusha-kohli':`Babusha Kohli is a poet and writer based in Jabalpur. Her debut poetry collection Prem Gilahari Dil Akhrot received the Bharatiya Jnanpith Navlekhan Award in 2014. Her books also include Bawan Chitthiyan, Bhaap Ke Ghar Mein Sheeshe Ki Ladki and Us Waqt Ka Naam Asambhav Hai.

Her poetry has been translated into several Indian and international languages. Beyond poetry, she takes an interest in music, theatre and cinema.`,
'chandan-rai':`Chandan Rai is a poet, writer and lyricist whose poetry explores love, pain and the experiences of life. He began writing songs and poems at a young age before going on to perform on stage.

He has participated in Hindi poetry gatherings in India and abroad. His poems and songs are characterised by sensitivity and accessible expression.`,
'aman-akshar':`Aman Akshar was born in Mundi, a small town in the Khandwa region of Madhya Pradesh. During his education there and later in Indore, he developed an interest in Hindi literature and song writing. He is known for performing his songs at poetry gatherings.

His song Bhasha Sirf Ram Hai received wide recognition. He has also written songs for the web series Siya Rammay and participates in social initiatives.`,
'manu-vaishali':`Manu Vaishali is a poet and lyricist who has performed on national stages. Having enjoyed rhyming from childhood, she began her journey in stage poetry after 2021. Her poems and songs also found an audience on social media.

She writes lyrical verse exploring love as well as other subjects. In 2023, she received the Hindi Sahitya Akademi's Yuva Icon Award.`,
'suman-gurjar':`Suman Gurjar is a police officer and writer. Born in Jaura, Madhya Pradesh, she graduated in history from Indira Gandhi National Open University. She joined the Madhya Pradesh Police in 1998 and has served in several roles.

Writing has remained a longstanding interest. She expresses her experiences through poetry and short pieces. Her work has appeared in newspapers and magazines and has been broadcast on All India Radio and Shivpuri FM.`,
'pallavi-trivedi':`Pallavi Trivedi entered the Madhya Pradesh Police as a Deputy Superintendent of Police in 2000. Alongside her service, she has remained active in writing and literary activities. Her published works include satire, poetry and travel memoirs.

She also enjoys travel, music and photography. In 2020, she received Madhya Pradesh's Vagishwari Samman for her literary contribution.`,
'manisha-pathak-soni':`Manisha Pathak Soni is a state police service officer from the 1998 batch. She undertook research at Devi Ahilya University on excellence in public service, and her environmental work has also received recognition.

Her books include Sarthi Saathi and Laingik Apradhon Ki Vaigyanik Vivechana. She has supported the publication of other writers' books and received awards for her contribution to literature.`
};
const path='resources/data/speakers-2024.json',data=JSON.parse(await fs.readFile(path,'utf8'));
for(const s of data.speakers){if(hindi[s.slug])s.hindi=hindi[s.slug].split('\n\n');else {s.hindi=s.paragraphs;s.paragraphs=english[s.slug].split('\n\n');}s.biography_language='en';s.translation_note='Editorial translation from the 2024 source; historical wording retained.';}
data.editorial_note='All 23 profiles now have English and Hindi. Fourteen use source English and editorial Hindi translations; nine retain abridged source Hindi with matching English translations. Full image-page transcription for those nine remains outstanding.';
await fs.writeFile(path,JSON.stringify(data,null,2)+'\n');
console.log('Added bilingual versions to all 23 profiles; nine remain abridged.');
