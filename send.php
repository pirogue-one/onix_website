<?php 
  // формируем URL, на который будем отправлять запрос в битрикс24
	$queryURL = "https://onixboats.bitrix24.ru/rest/1/cvybczay9wksrsvy/crm.lead.add.json";	

  // Проверяем, что форма была отправлена методом POST
  if ($_SERVER["REQUEST_METHOD"] !== "POST") {
      die("Ошибка: форма должна быть отправлена методом POST");
  }

  //собираем данные из формы
  $sPhone = isset($_POST["PHONE"]) ? htmlspecialchars(trim($_POST["PHONE"])) : '';
  $sName = isset($_POST["NAME"]) ? htmlspecialchars(trim($_POST["NAME"])) : '';
  $sEmail = isset($_POST["EMAIL"]) ? htmlspecialchars(trim($_POST["EMAIL"])) : '';
  $sMessage = isset($_POST["MESSAGE"]) ? htmlspecialchars(trim($_POST["MESSAGE"])) : '';
  $roistatVisitId = array_key_exists('roistat_visit', $_COOKIE) ? $_COOKIE['roistat_visit'] : 'nocookie';

  
  // Валидация обязательных полей
  if (empty($sName)) {
      die("Ошибка: поле 'Имя' обязательно для заполнения");
  }
  
  if (empty($sPhone)) {
      die("Ошибка: поле 'Телефон' обязательно для заполнения");
  }
  
  // Валидация email если указан
  if (!empty($sEmail) && !filter_var($sEmail, FILTER_VALIDATE_EMAIL)) {
      die("Ошибка: некорректный email адрес");
  }
  
  // Подготавливаем данные для Bitrix24 API
  $arPhone = (!empty($sPhone)) ? array(array('VALUE' => $sPhone, 'VALUE_TYPE' => 'MOBILE')) : array();
  $arEmail = (!empty($sEmail)) ? array(array('VALUE' => $sEmail, 'VALUE_TYPE' => 'WORK')) : array();
	
	// формируем параметры для создания лида	
	$fields = array(
		"TITLE" => "Заявка с сайта от " . $sName,
		"NAME" => $sName,
		"COMMENTS" => $sMessage,
		"SOURCE_ID" => "WEB",
		"SOURCE_DESCRIPTION" => "Заявка с сайта onixboats.ru",
		"SOURCE_COMMON" => "ФОС",
		"ROISTAT_VISIT" => $roistatVisitId
	);
	
	// Добавляем телефон если есть
	if (!empty($arPhone)) {
		$fields["PHONE"] = $arPhone;
	}
	
	// Добавляем email если есть
	if (!empty($arEmail)) {
		$fields["EMAIL"] = $arEmail;
	}
	
	$queryData = http_build_query(array(
		"fields" => $fields,
		'params' => array("REGISTER_SONET_EVENT" => "Y")
	));

	$debug_mode = false; // Установите в true для отладки
	if ($debug_mode) {
		echo "<h3>Debug Information:</h3>";
		echo "<p><strong>Phone:</strong> " . htmlspecialchars($sPhone) . "</p>";
		echo "<p><strong>Name:</strong> " . htmlspecialchars($sName) . "</p>";
		echo "<p><strong>Email:</strong> " . htmlspecialchars($sEmail) . "</p>";
		echo "<p><strong>Message:</strong> " . htmlspecialchars($sMessage) . "</p>";
		echo "<h4>Fields array:</h4>";
		echo "<pre>" . print_r($fields, true) . "</pre>";
		echo "<h4>Query data:</h4>";
		echo "<pre>" . htmlspecialchars($queryData) . "</pre>";
	}

	// отправляем запрос в Б24 и обрабатываем ответ
	$curl = curl_init();
	curl_setopt_array($curl, array(
		CURLOPT_SSL_VERIFYPEER => 0,
		CURLOPT_POST => 1,
		CURLOPT_HEADER => 0,
		CURLOPT_RETURNTRANSFER => 1,
		CURLOPT_URL => $queryURL,
		CURLOPT_POSTFIELDS => $queryData,
	));
	
	if ($debug_mode) {
		$result = '{"result":1}';
	} else {
		$result = curl_exec($curl);
	}
	$http_code = curl_getinfo($curl, CURLINFO_HTTP_CODE);
	$curl_error = curl_error($curl);
	curl_close($curl);
	
	// Проверяем ошибки cURL
	if ($curl_error) {
		die("Ошибка cURL: " . $curl_error);
	}
	
	// Проверяем HTTP код ответа
	if ($http_code !== 200) {
		die("Ошибка HTTP: код " . $http_code . ". Ответ сервера: " . htmlspecialchars($result));
	}
	
	$result = json_decode($result, true);
	
	// Проверяем ошибки JSON
	if (json_last_error() !== JSON_ERROR_NONE) {
		die("Ошибка декодирования JSON: " . json_last_error_msg() . ". Ответ сервера: " . htmlspecialchars($result));
	}

	// если произошла какая-то ошибка - выведем её
	if(array_key_exists('error', $result))
	{      
		die("Ошибка при сохранении лида: ".$result['error_description']);
	}
	
	// Проверяем успешность создания лида
	if (!isset($result['result']) || empty($result['result'])) {
		die("Ошибка: не удалось создать лид в системе. Ответ сервера: " . htmlspecialchars(print_r($result, true)));
	}
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Заявка отправлена - ONIX Boats</title>
    <style>
        body {
            font-family: "Inter", "Open Sans", sans-serif;
		}
           
        .success-container {
            background: #333;
            padding: 30px;
            border-radius: 4px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            text-align: center;
        }
        .success-icon {
            font-size: 48px;
            color: #FCC800;
            margin-bottom: 20px;
        }
        h3 {
            font-family: "Bebas Neue", "Open Sans", sans-serif;
			text-transform: uppercase;
            margin-bottom: 20px;
			color: #FFFFFF;
        }
		p {
			color: #FFFFFF;
		}
    </style>
</head>
<body>
    <div class="success-container">
        <div class="success-icon">✓</div>
        <h3>Заявка успешно отправлена!</h3>
        <p>Наш менеджер свяжется с вами </br>в ближайшее время.</p>
    </div>
</body>
</html>