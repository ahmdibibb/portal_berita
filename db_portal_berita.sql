-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 13, 2025 at 04:08 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `portal_berita`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Teknologi', 'teknologi', NULL, '2025-08-08 12:01:30', '2025-08-08 12:01:30'),
(2, 'Olahraga', 'olahraga', NULL, '2025-08-08 12:01:30', '2025-08-08 12:01:30'),
(3, 'Politik', 'politik', NULL, '2025-08-08 12:01:30', '2025-08-08 12:01:30'),
(4, 'Ekonomi', 'ekonomi', NULL, '2025-08-08 12:01:30', '2025-08-08 12:01:30'),
(5, 'Kesehatan', 'kesehatan', NULL, '2025-08-08 12:01:30', '2025-08-08 12:01:30');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `news_id` int NOT NULL,
  `user_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `content`, `status`, `created_at`, `updated_at`, `news_id`, `user_id`) VALUES
(1, 'Wow', 'approved', '2025-08-08 05:05:08', '2025-08-08 06:58:12', 3, 2),
(3, 'wow amazing', 'approved', '2025-08-10 20:39:42', '2025-08-10 20:43:24', 9, 3);

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `id` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `news_id` int NOT NULL,
  `user_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`id`, `created_at`, `news_id`, `user_id`) VALUES
(2, '2025-08-08 05:04:32', 3, 2),
(3, '2025-08-08 09:33:42', 5, 3),
(4, '2025-08-08 09:34:11', 2, 3),
(5, '2025-08-08 09:34:23', 4, 3),
(6, '2025-08-08 09:35:03', 3, 3),
(7, '2025-08-08 09:38:55', 5, 2),
(8, '2025-08-08 09:39:07', 4, 2),
(9, '2025-08-08 09:39:12', 1, 2),
(10, '2025-08-08 09:45:02', 1, 1),
(11, '2025-08-08 09:45:02', 2, 2),
(12, '2025-08-08 09:45:02', 2, 1),
(13, '2025-08-10 20:39:47', 9, 3),
(14, '2025-08-10 20:43:16', 9, 1);

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `id` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `excerpt` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `views` int NOT NULL DEFAULT '0',
  `status` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'draft',
  `published_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `category_id` int NOT NULL,
  `author_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`id`, `title`, `slug`, `excerpt`, `content`, `image`, `views`, `status`, `published_at`, `created_at`, `updated_at`, `category_id`, `author_id`) VALUES
(1, 'Perkembangan Teknologi AI di Indonesia', 'perkembangan-teknologi-ai-di-indonesia', 'Teknologi Artificial Intelligence semakin berkembang pesat di Indonesia dengan berbagai inovasi terbaru.', '\n        <p>Teknologi Artificial Intelligence (AI) telah menjadi salah satu fokus utama dalam pengembangan teknologi di Indonesia. \n        Berbagai perusahaan startup dan institusi pendidikan telah mulai mengadopsi teknologi AI dalam berbagai aspek.</p>\n        \n        <p>Menurut data terbaru, investasi dalam sektor AI di Indonesia telah mencapai angka yang signifikan dalam beberapa tahun terakhir. \n        Hal ini menunjukkan bahwa Indonesia siap untuk menjadi salah satu pusat pengembangan AI di Asia Tenggara.</p>\n        \n        <p>Beberapa aplikasi AI yang sudah banyak digunakan di Indonesia meliputi:</p>\n        <ul>\n          <li>Chatbot untuk customer service</li>\n          <li>Sistem rekomendasi untuk e-commerce</li>\n          <li>Analisis data untuk bisnis</li>\n          <li>Pengenalan wajah untuk keamanan</li>\n        </ul>\n        \n        <p>Dengan dukungan dari pemerintah dan sektor swasta, masa depan AI di Indonesia terlihat sangat menjanjikan.</p>\n      ', NULL, 166, 'published', '2025-08-08 05:02:01', '2025-08-08 05:02:01', '2025-08-12 18:46:04', 1, 1),
(2, 'Timnas Indonesia Raih Kemenangan di Kualifikasi Piala Dunia', 'timnas-indonesia-raih-kemenangan-di-kualifikasi-piala-dunia', 'Tim nasional Indonesia berhasil meraih kemenangan penting dalam pertandingan kualifikasi Piala Dunia.', '\n        <p>Tim nasional Indonesia berhasil meraih kemenangan penting dalam pertandingan kualifikasi Piala Dunia 2026. \n        Pertandingan yang berlangsung di Stadion Gelora Bung Karno ini berhasil dimenangkan dengan skor 2-1.</p>\n        \n        <p>Gol pertama dicetak oleh pemain muda berbakat pada menit ke-25, disusul dengan gol kedua pada menit ke-67. \n        Meskipun tim lawan berhasil mencetak gol balasan pada menit ke-85, timnas Indonesia tetap mempertahankan keunggulan hingga akhir pertandingan.</p>\n        \n        <p>Pelatih timnas Indonesia mengungkapkan kebanggaannya atas performa tim yang sangat baik. \n        \"Para pemain telah menunjukkan dedikasi dan semangat yang luar biasa. Ini adalah langkah penting menuju Piala Dunia 2026,\" ujarnya.</p>\n        \n        <p>Kemenangan ini memberikan harapan baru bagi Indonesia untuk bisa lolos ke Piala Dunia untuk pertama kalinya dalam sejarah.</p>\n      ', NULL, 348, 'published', '2025-08-07 05:02:01', '2025-08-08 05:02:01', '2025-08-12 07:18:22', 2, 1),
(3, 'Kebijakan Ekonomi Baru Diumumkan Pemerintah', 'kebijakan-ekonomi-baru-diumumkan-pemerintah', 'Pemerintah mengumumkan serangkaian kebijakan ekonomi baru yang diharapkan dapat mendorong pertumbuhan ekonomi nasional.', '\n        <p>Pemerintah Indonesia mengumumkan serangkaian kebijakan ekonomi baru yang diharapkan dapat mendorong pertumbuhan ekonomi nasional. \n        Kebijakan ini mencakup berbagai aspek mulai dari investasi, perdagangan, hingga pengembangan UMKM.</p>\n        \n        <p>Menteri Keuangan menjelaskan bahwa kebijakan ini dirancang untuk mengatasi berbagai tantangan ekonomi global yang sedang terjadi. \n        \"Kami telah melakukan analisis mendalam dan konsultasi dengan berbagai pihak untuk memastikan kebijakan ini tepat sasaran,\" ujarnya.</p>\n        \n        <p>Beberapa poin penting dalam kebijakan ekonomi baru ini meliputi:</p>\n        <ul>\n          <li>Insentif pajak untuk investasi di sektor prioritas</li>\n          <li>Dukungan pembiayaan untuk UMKM</li>\n          <li>Kemudahan perizinan usaha</li>\n          <li>Pengembangan infrastruktur digital</li>\n        </ul>\n        \n        <p>Para pelaku usaha menyambut baik kebijakan ini dan berharap dapat memberikan dampak positif bagi perekonomian Indonesia.</p>\n      ', NULL, 294, 'published', '2025-08-06 05:02:01', '2025-08-08 05:02:01', '2025-08-08 09:35:02', 4, 1),
(4, 'test', 'test', 'test test testtest test testtest test testtest test test', 'test test testtest test testtest test testtest test testtest test testtest test testtest test testtest test testtest test testtest test testtest test testtest test testtest test testtest test testtest test test', NULL, 24, 'published', '2025-08-08 05:07:06', '2025-08-08 05:07:06', '2025-08-12 07:18:20', 5, 1),
(5, 'ini test lagii', 'ini-test-lagii', 'bikin test lagii test lagii', 'bikin test lagii test lagiibikin test lagii test lagiibikin test lagii test lagiibikin test lagii test lagiibikin test lagii test lagiibikin test lagii test lagiibikin test lagii test lagiibikin test lagii test lagiibikin test lagii test lagiibikin test lagii test lagiibikin test lagii test lagiibikin test lagii test lagii', 'https://www.english-efl.com/wp-content/uploads/2019/12/test.jpg', 32, 'published', '2025-08-08 09:20:29', '2025-08-08 09:20:29', '2025-08-12 07:37:02', 3, 1),
(9, 'Hasil Chelsea vs AC Milan: The Blues Hancurkan 10 Pemain Rossoneri, Luka Modric Debut Pahit', 'hasil-chelsea-vs-ac-milan-the-blues-hancurkan-10-pemain-rossoneri-luka-modric-debut-pahit', 'Chelsea tampil superior saat menjamu AC Milan pada laga uji coba pramusim di Stamford Bridge, Minggu (10/8) malam WIB. Bermain di hadapan pendukung sendiri, The Blues menang telak 4-1 atas Rossoneri yang harus bermain dengan 10 orang sejak awal babak pertama.', 'Pertandingan ini menjadi debut Luka Modric bersama Milan, namun momen bersejarah itu berakhir pahit. Tim asuhan Massimiliano Allegri kesulitan bangkit setelah kehilangan satu pemain pada menit-menit awal, sehingga Chelsea leluasa mengontrol jalannya laga.\n\nDuel ini juga menghadirkan reuni bagi dua eks Chelsea, Fikayo Tomori dan Ruben Loftus-Cheek, yang kini membela Milan. Sementara itu, Christian Pulisic absen karena cedera pergelangan kaki dan Malick Thiaw tidak masuk skuad karena sedang menjalani tes medis bersama Newcastle United.\n\nSebelum laga dimulai, Chelsea memamerkan trofi Piala Dunia Antarklub dan Liga Konferensi Eropa di hadapan publik Stamford Bridge.\nChelsea langsung memimpin di menit kelima berkat gol bunuh diri Andrei Coubis. Pemain muda Milan itu tidak sengaja membelokkan tendangan bebas Reece James ke gawang sendiri.\n\nHanya beberapa menit berselang, Joao Pedro menggandakan keunggulan tuan rumah lewat sundulan setelah menerima umpan silang Pedro Neto.\n\nPetaka Milan semakin menjadi saat Coubis mendapat kartu merah langsung karena melanggar Joao Pedro yang lolos dari kawalan.\n\nBermain dengan 10 orang selama lebih dari 70 menit membuat Milan kesulitan keluar dari tekanan. Chelsea hampir menambah gol melalui tendangan bebas Cole Palmer yang membentur tiang, sementara Milan sempat mencetak gol melalui Rafael Leao namun dianulir karena offside.\n\nChelsea akhirnya menambah gol pada menit ke-67 dan 90, lewat aksi Liam Delap. Gol pertama dari titik putih dan gol kedua hasil umpan Andrey Santos. Sementara, AC Milan dapat gol hiburan pada menit ke-70 dari aksi Youssouf Fofana.\nChelsea (4-2-3-1): Sanchez; James (Malo Gusto 60), Chalobah (Acheampong 57), Tosin, Cucurella (Hato 73); Caicedo (Essugo 73), Fernandez (Andrey Santos 60); Neto (Walsh 73), Palmer (Estevao 60), Gittens (George 73); Joao Pedro (Delap 60).\n\nManajer: Enzo Maresca.\n\nAC Milan (3-4-2-1): Maignan; F Terracciano, Tomori, Coubis; Saelemaekers, Musah (Dutu 73), Ricci (Modric 46), Fofana, Bartesaghi; Loftus-Cheek (Sia 85), Leao.\n\nManajer: Massimiliano Allegri.', '/uploads/1754857722458-vgv6nxh70gh.jpg', 72, 'published', '2025-08-10 20:29:52', '2025-08-10 20:29:52', '2025-08-13 02:56:10', 2, 1),
(10, 'Trump warns homeless people to leave Washington, DC, ‘immediately’', 'trump-warns-homeless-people-to-leave-washington-dc-immediately', 'President Donald Trump said on social media that “the Homeless have to move out, IMMEDIATELY. We will give you places to stay, but FAR from the Capital.”', 'President Donald Trump on Sunday warned the homeless population of Washington, D.C., to leave the city, and again signaled that he is ramping up plans to target crime in the nation’s capital, even as data shows that crime rates in the city are falling.\n\n“The Homeless have to move out, IMMEDIATELY. We will give you places to stay, but FAR from the Capital,” he posted on Truth Social.\n\nTrump has increased his rhetoric about countering crime in the city in recent days, after a former member of the so-called Department of Government Efficiency was assaulted in an attempted carjacking.\n\n“It’s all going to happen very fast, just like the Border,” Trump wrote on Truth Social.\n\n“We went from millions pouring in, to ZERO in the last few months. This will be easier — Be prepared!”\n\n“There will be no “MR. NICE GUY.” We want our Capital BACK,” he said.\n\nTrump signed an executive order July 24 making it easier for cities to remove homeless people, drawing fire from advocates for the homeless. His social media post is the latest sign that he seeks to follow through on this effort, particularly in Washington.\n\nTrump’s comments about crime in Washington are at odds with data from the Justice Department that shows violent crime in the city in 2024 was at a 30-year low, and homicides, robberies and armed carjackings have all declined.\n\nTrump also reiterated in his social media post that he plans to hold a press availability at the White House on Monday about crime in D.C.\n\nIn a subsequent Truth Social post later on Sunday, he said that the media availability will be Monday at 10 a.m.\n\nHe said his remarks will also “be about Cleanliness and the General Physical Renovation and Condition of our once beautiful and well maintained Capital.”\n\nThe White House last week announced a seven-day effort to counter crime in the city, including an increased presence of federal law enforcement across the city.\n\nThe District of Columbia has been a frequent target of Trump’s, including during his first term. Still, his language has become more forceful in recent days, sparking ire from Democratic leadership in the city.\n\n“Any comparison to a war-torn country is hyperbolic and false,” D.C. Mayor Muriel Bowser said on MSNBC.\n\n“I also just really want to say we always want to get better, and there are ways more than any other city in America that the federal government can help the District of Columbia,” she said.', '/uploads/1754995197062-gbvvuljo85l.jpg', 16, 'published', '2025-08-12 10:41:34', '2025-08-12 10:41:34', '2025-08-12 18:25:08', 3, 1),
(11, 'Trump’s pick for BLS commissioner suggests suspending the monthly jobs report', 'trumps-pick-for-bls-commissioner-suggests-suspending-the-monthly-jobs-report', 'I am pleased to announce that I am nominating Highly Respected Economist, Dr. E.J. Antoni, as the next Commissioner of the Bureau of Labor Statistics,” Trump wrote in a Truth Social post on Monday.', 'EJ Antoni, nominated by President Donald Trump Monday to become the next commissioner for the Bureau of Labor Statistics, suggested that the agency should suspend its monthly jobs report, claiming it is unreliable and frequently overstated.\n\nAntoni, in an interview with Fox Business News that took place before his nomination and was published Tuesday, said the BLS should instead publish quarterly data after it had been revised until BLS can ensure its monthly jobs data is more accurate.\n\n“Until it is corrected, the BLS should suspend issuing the monthly job reports but keep publishing the more accurate, though less timely, quarterly data,” he told Fox Business. “Major decision-makers from Wall Street to D.C. rely on these numbers, and a lack of confidence in the data has far-reaching consequences.”\n\nTrump fired former Bureau of Labor Statistics commissioner Erika McEntarfer after the July jobs report showed weak growth that month and included revisions for May and June that were historically large. Trump claimed, without evidence, the revisions constituted a “scam” and a vendetta against his presidency.\n\nAntoni told Fox he disagrees with Trump, saying he doesn’t believe the BLS intentionally manipulated the jobs data. But Antoni has criticized the BLS’ approach to data collection, noting that revisions to monthly jobs reports have been significantly larger since the pandemic. However, the May and June revisions were not unprecedented.\n\nMay’s jobs total was revised lower to 19,000, down from an initial estimate of 139,000 — a total revision of 120,000 jobs. For the June jobs total, the BLS on Friday said the US economy added just 14,000 jobs, down from a preliminary estimate of 147,000 — a revision of 133,000 jobs.\n\nThe BLS tracks each month’s revisions dating back to 1979, but introduced a new probability-based sample design for revisions in 2003. Between 1979 and 2003, the average monthly revision was 61,000 jobs. Since 2003, the average monthly revision is only a slightly more accurate 51,000 jobs.\n\nEconomic data is frequently revised — especially as more comprehensive information becomes readily available — to provide a clearer, more accurate picture of the dynamics in play. Measuring economic activity, however, has grown more challenging in recent years, because of the seismic impact the pandemic had on global supply chains and US businesses and households.\n\nStill, one of the most illustrative examples of ongoing revisions is the BLS’ labor market data and, specifically, the closely watched jobs report.\n\nWhen the market-moving jobs report (which is composed of two large surveys) is released, that initial estimate is often based on incomplete data and thus will be revised twice further in the two jobs reports that follow, as the BLS receives more information.\n\nIn addition to the surveying, the BLS also incorporates methodology to try to capture employment activity at new businesses and those that have closed. Even then, the monthly numbers aren’t final and fully comprehensive.\n\nEvery year, the BLS conducts annual benchmark revisions to replace these sample-based employment estimates with fuller employment counts as recorded in the Quarterly Census of Employment and Wages (a more comprehensive, but incredibly lagging read on labor market activity that uses quarterly tax reports, not surveys).\n\nThis is a developing story and will be updated.', '/uploads/1755020582104-s8mpdb7f9ig.webp', 0, 'published', '2025-08-12 17:46:02', '2025-08-12 17:46:02', '2025-08-12 17:46:02', 3, 1),
(12, 'Coach Conversation | UFC 319: Dricus Du Plessis vs Khamzat Chimaev', 'coach-conversation--ufc-319-dricus-du-plessis-vs-khamzat-chimaev', 'Xtreme Couture Leader Eric Nicksick Delivers His Insights On Saturday’s Middleweight Title Fight In Chicago', 'hampionship fights are layered battles, with the competitors stepping into the Octagon operating at the highest level in their respective weight classes. Breaking down how these pivotal contests could possibly play out is a challenging venture, which is why UFC staff writer E. Spencer Kyte has taken to enlisting the help of some of the sharpest minds in the sport to help dissect these critical contests.\n\nHeading into this weekend’s UFC 319 middleweight championship fight between Dricus Du Plessis and Khamzat Chimaev, Kyte sat down with Xtreme Couture head coach Eric Nicksick, who guided Sean Stickland into battle with the South African middleweight champion on two occasions, to get his thoughts on what each man brings to the Octagon and how this fight may shake out on Saturday night at United Center.\n\nBest Trait of Each Fighter\nKyte: Given that you’ve been in the opposite corner for two of Dricus’ last two fights, it only made sense to reach out to you for this one, so let’s dive right into it — what’s the best trait of each guy?\n\nNicksick: So for Dricus, it’s his pressure and his pace. We’ve all seen it, we’ve all said it — his striking looks awkward and funky — but what he does really well is stay busy, keep throwing things, and he’s able to do that for five rounds.\nIt doesn’t have to be clean or even that effective in terms of damage and landing — it’s just that he’s always putting something out there for you to deal with, mixing things up, and when you look at a fight like this against Chimaev, that ability to make him work, force him to be a little more defensive, and maintain that output into the third, fourth, fifth rounds could be a big positive for him.\n\nKyte: And what about the challenger?\n\nNicksick: For Chimaev it’s the wrestling, but it’s how he wrestles, the way he gets after these guys that really stands out.\nKyte: Right — he’s on you straight away, suffocating you, not giving you any chance to get settled or prepare for what’s coming.\n\nNicksick: A hundred percent.\n\nHe chains everything together so well, so quickly that it’s hard to react and respond. He likes to just blitz right away — get across the cage, get connected to you — and then he’s immediately looking to get you down, switching his entries, constantly making you defend. Once he gets you down, he’s flattening you out, looking for ground-and-pound or a choke.\nWe’ve seen it in almost all of his fights — guys are just stuck on the back foot, stuck defending — and Chimaev is too strong, too good for them to be able to stop him. His early pressure, and how Dricus deals with that early blitz will go a long way to showing us how this fight is going to play out.\n\nPath to Victory\nKyte: All right, so let’s get into that side of things then. What’s the path to victory for the champ and what’s the path to victory for the challenger?\n\nNicksick: For Dricus, he has to get through the early rounds, has to find a way to drag Chimaev into the third, fourth, fifth rounds and look to get him tired, look to really capitalize in those later rounds.\nHe’s not someone that is going to come out there and put you away early — he’s done it in the past, but he hasn’t really done it in the UFC. He builds into fights, and has shown in these last three that he’s definitely able to have success later into the fight. What’d he finish Izzy in, the fourth or the fifth?\n\nKyte: Later in the fourth.\nNicksick: Right, and he went five rounds with Sean both times. He needs to defend that early blitz, make Chimaev really work for everything, make him spend energy, and then try to really push the pace and get after him in the later rounds where we’ve seen him slow down in the past.\n\nKyte: Yeah, this feels like a classic “if it ends early, it’s one result, and if it ends late, it’s the other” kind of fight.\n\nNicksick: A hundred percent.\nKyte: And for Chimaev it’s get out there, get after him, and get it over with in a hurry.\n\nNicksick: Yeah, he’s not looking to show he can go five rounds or spend any more time in there than he has to. It needs to look like the fight with Whittaker.\n\nKyte: Right — shoot right away, get connected, and make him deal with everything you’re giving him, trying to get him out of there?\n\nNicksick: A hundred percent.\nHe took Whittaker down in 30 seconds, or was on his waist wrestling in 30 seconds, and Whittaker was never able to recover, couldn’t get free. He’s so strong, his control is so good, and once he’s connected to you, he’s working — moving you around, looking to get hooks in, get to your back, landing little shots, little knees to the thigh — and you’re just stuck there trying to deal with it as soon as the fight starts.\n\nKyte: If you’re Dricus or you’re in his corner, and you know this is coming, you know you’re going to have to deal with this, what do you tell him?\n\nNicksick: First is you have to try to be offensive, but not rush — you have to try to make Khamzat go backwards, but you can’t be wild because he’ll just shoot underneath.\nBut in terms of dealing with getting taken down, him getting into the wrestling, you have to just be really tight with your defense, and be technical in how you deal with things.\n\nKyte: It feels like one of those spots — and I shout this at my TV all the time watching fights, as if I know what I’m talking about — where you can’t worry about offense at all; it has to just be stuff the head, keep a strong base if he’s in trying to take you down along the fence, and when he gets you down, keep the chin tucked, deal with the hooks, and just two-on-one, baseball bat, make sure you don’t get mauled.\n\nNicksick: Yep, and that’s easier said than done, right, but that’s what you have to do because his pressure is too good, his chain wrestling is too good.\nWhittaker has great defensive wrestling and even in that one little moment in that fight where he got to his butt and started to get free, you saw how quickly Khamzat was right back on him, dragging him back to the canvas.\n\nYou almost have to accept that if he gets you down, that’s the round for him and your job is to survive and do better the next time.\n\nKyte: It’s true. It sucks, but it’s true.\n\nX Factor\nKyte: Okay, so what’s the X-factor here? What’s the one thing that can have a big impact on how this fight plays out?\n\nNicksick: It’s gotta be how Dricus deals with that early rush and how Chimaev holds up if he can’t get him out of there in the early rounds.\nKyte: And those two things go hand-in-hand.\n\nNicksick: A hundred percent because we don’t get one if the other doesn’t happen, right? Like Dricus has to survive the early storm and make Khamzat work past Round 2 in order to force him into deep waters where his volume and pressure can take over.\nIf he can do that, then we get see how Chimaev looks against an elite fighter, someone that has shown he can have success in those later rounds in those spots where we’ve seen him slow down before.\n\nKyte: Who dictates that more to you? Here’s what I mean: those two things are connected — the early blitz from Khamzat, the need for Dricus to survive and take him into deep waters — but does one guy have a greater say, I guess, in determining whether or not that happens?\n\nNicksick: I don’t know if one guy has a greater say, but the offensive guy always has the edge, right?\n\nDricus can defend and make the right decisions and concede positions, but that all works in Khamzat’s favor, and if he can suffocate him early — chain wrestle, control him, keep him from getting into any kind of rhythm at all in those first couple rounds — it makes it more difficult for Dricus to just come out in the third or fourth if it gets there and just get rolling.\n\nIt’s hard to be down 2-0, have a guy all over you, and then come out and just take it to him. Not that he can’t do it, but it’s difficult, especially when it’s a guy like Khamzat that you’re dealing with on the ground, you know?\nOne Coaching Curiosity\nKyte: So then what’s your point of curiosity here? What’s something about this matchup, this fight, how it plays out that you’re thinking about, that you want to see that falls outside of the standard stuff we usually talk about?\n\nNicksick: So Khamzat has been working with Coach Cal at The Treigning Lab in Orange County…\n\nKyte: The place (TJ) Dillashaw and those guys did all their cardio and conditioning and stuff? It’s Sam Calavitta, right?\n\nNicksick: Yep. He’s been out there with (Aaron) Pico and them, and I’m told he’s made significant cardio strides working with Coach Cal, focusing on extended high-intensity intervals, oxygen efficiency drills, and sport-specific endurance circuits.\nKyte: Yeah, Coach Cal is a mad scientist with this stuff and pushes to get everything dialed all the way in.\n\nNicksick: For sure, and so that kind of stuff could allow Khamzat to maintain a more aggressive pace in the later rounds. I’m not saying it will for sure, but if the improvements hold up and he’s able to keep wrestling for 15 or 25 minutes, that’s a big factor and a big change from how we all kind of see things maybe playing out.\nKyte: Okay. I had no idea he was out there; that’s really big. Like you said, it doesn’t guarantee anything, but it’s definitely something that is good to know, that you have to think about going into this now.\n\nNicksick: A hundred percent.', '/uploads/1755052443804-zcggykg3jkr.jpg', 0, 'published', '2025-08-13 02:37:10', '2025-08-13 02:37:10', '2025-08-13 02:37:10', 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `saved_news`
--

CREATE TABLE `saved_news` (
  `id` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `news_id` int NOT NULL,
  `user_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user',
  `status` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `status`, `avatar`, `created_at`, `updated_at`) VALUES
(1, 'Administrator', 'admin@portalberita.com', '$2b$10$jBJQ9qXPeDMdQoXlyly06uN4jYDY6jiyUEv9EC88q79x9vWRkSc42', 'admin', 'active', NULL, '2025-08-08 12:00:52', '2025-08-13 02:14:36'),
(2, 'Test User', 'user@portalberita.com', '$2b$10$jBJQ9qXPeDMdQoXlyly06uN4jYDY6jiyUEv9EC88q79x9vWRkSc42', 'user', 'active', NULL, '2025-08-08 05:02:01', '2025-08-08 05:02:01'),
(3, 'bobii', 'bobi@mail.com', '$2b$10$sH98UDP3qiYbjzUZjtYq8eYZWzvoYeWgxUyRRKodfkl.MWaLS6mM.', 'user', 'active', NULL, '2025-08-08 09:33:15', '2025-08-08 09:33:15');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_comments_news_id` (`news_id`),
  ADD KEY `idx_comments_user_id` (`user_id`),
  ADD KEY `idx_comments_status` (`status`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_likes_news_user` (`news_id`,`user_id`),
  ADD KEY `idx_likes_news_id` (`news_id`),
  ADD KEY `idx_likes_user_id` (`user_id`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `idx_news_category_id` (`category_id`),
  ADD KEY `idx_news_author_id` (`author_id`),
  ADD KEY `idx_news_status` (`status`),
  ADD KEY `idx_news_published_at` (`published_at`);

--
-- Indexes for table `saved_news`
--
ALTER TABLE `saved_news`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_saved_news_news_user` (`news_id`,`user_id`),
  ADD KEY `idx_saved_news_news_id` (`news_id`),
  ADD KEY `idx_saved_news_user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `saved_news`
--
ALTER TABLE `saved_news`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `fk_comments_news` FOREIGN KEY (`news_id`) REFERENCES `news` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_comments_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `fk_likes_news` FOREIGN KEY (`news_id`) REFERENCES `news` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_likes_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `news`
--
ALTER TABLE `news`
  ADD CONSTRAINT `fk_news_author` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_news_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `saved_news`
--
ALTER TABLE `saved_news`
  ADD CONSTRAINT `fk_saved_news_news` FOREIGN KEY (`news_id`) REFERENCES `news` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_saved_news_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
