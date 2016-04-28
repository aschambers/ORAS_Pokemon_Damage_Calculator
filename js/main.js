function $(id) {
	return document.getElementById(id);
}
function calc() {
	// sets the min level to 1, and max level to 100 
	if ($('level').value != '') {
		$('level').value = Math.min(100, $('level').value);
		$('level').value = Math.max(1, $('level').value);
	};
	// sets the move power to 100 by default, which can be from 0 to the power of the move  
	if ($('move_power').value != '') {
		$('move_power').value = Math.max(0, $('move_power').value);
	};	
	// sets the attack value to 100 by default, but use can enter any value 
	if ($('attack').value != '') {
		$('attack').value = Math.max(1, $('attack').value);
	};
	// sets attack value at a min of -6, and max of 6 
	if ($('attack_stage').value != '' && $('attack_stage').value != '-') {
		$('attack_stage').value = Math.max(-6, $('attack_stage').value);
		$('attack_stage').value = Math.min(6, $('attack_stage').value);
	};	
	// sets default value of def at 100, but can range from 1 to inf 
	if ($('opp_def').value != '') {
		$('opp_def').value = Math.max(1, $('opp_def').value);
	};
	// sets defense value at a min of -6, and max of 6
	if ($('opp_def_stage').value != '' && $('opp_def_stage').value != '-') {
		$('opp_def_stage').value = Math.max(-6, $('opp_def_stage').value);
		$('opp_def_stage').value = Math.min( 6, $('opp_def_stage').value);
	};

	// initialize variables to values of field/for attackers
	var Level = $('level').value;
	var BasePower = $('move_power').value;
	var Atk = $('attack').value;
	var AtkMod = $('attack_stage').value == '-' ? 0 : $('attack_stage').value;
	var FF = $('atk_ability').selectedIndex == 6 ? 1.5 : 1;
	var BRN = $('burn').checked && $('atk_ability').selectedIndex != 8 ? 0.5 : 1;
	var CHG = $('charge').checked ? 2 : 1;
	var CH = $('critical').checked ? ($('atk_ability').selectedIndex == 26 ? 3 : 2) : 1;
	// case where helping hand is checked (ternary operator)
	var HH = $('hhand').checked ? 1.5 : 1;
	var MF = $('me1st').checked ? 1.5 : 1;
	var twoOpp = $('twoOpp').checked && $('double').checked ? 0.75 : 1;
	var selfD = $('selfD').checked ? 0.5 : 1;
	var STAB = $('stab').checked ? ($('atk_ability').selectedIndex == 1 ? 2 : 1.5) : 1;
	// initialize variables to values of the field/for defenders: Target Info
	var Type1 = $('type1').value;
	var Type2 = $('type2').value;
	var Def = $('opp_def').value;
	var DefMod = $('opp_def_stage').value == '-' ? 0 : $('opp_def_stage').value;
	var SST = $('storm').checked ? 1.5 : 1; //sandstorm
	// initialize variables to values of field/for defenders: Other Info
	var RL = $('barr').checked && CH == 1 ? ($('double').checked ? 2/3 : 0.5) : 1;
	var MS = $('msport').checked ? 0.5 : 1;
	var WS = $('wsport').checked ? 0.5 : 1;
	var SR = $('weather').value;

	// Items 6, and 9-19 in list.
	switch ($('atk_item').selectedIndex) {
		case 6: // Life Orb
			var ITM = 1.3;
			break;
		default: // Metronome
			if ($('atk_item').selectedIndex >= 9 && $('atk_item').selectedIndex <= 19)
				var ITM = ($('atk_item').selectedIndex - 9) / 10 + 1;
			else var ITM = 1;
	}

	// Items 1, 8, 20, 23, 24 
	switch ($('atk_item').selectedIndex) {
		case 1: // Adamant Orb
		case 8: // Lustrous Orb 
		case 20: // Muscle Band
		case 23: // Type-Up Item
			var IT = 1.2;
			break;
		case 24: // Wise Glasses
			var IT = 1.1;
			break;
		default: // sets default item multiplier to 1.
			var IT = 1;
	}

	// Items 2, 3, 4, 7, 21, 22
	switch ($('atk_item').selectedIndex) {
		case 2: // Choice Band / Gem
		case 3: // Choice Specs / Gem
		case 4: // DeepSea Tooth
		case 7: // Light Ball
		case 21: // Soul Dew
			var AtkItem = 1.5;
			break;
		case 22: // Thick Club
			var AtkItem = 2;
			break;
		default: // Default Attack Item
			var AtkItem = 1;
	}

	// Item: Expert Belt
	var EB = $('atk_item').selectedIndex == 5 ? 1.2 : 1;

	// Tinted Lens Ability (Offense)
	var TT = $('atk_ability').selectedIndex == 31 && Type1 * Type2 < 1 ? 2 : 1;

	// abilities for attacker 
	switch ($('atk_ability').selectedIndex) {
		case 2: // Aerialate (New)
			var UA = 1.3;
			break;
		case 3: // Blaze
			var UA = 1.5;
			break;
		case 11: // Iron Fist
		case 14: // Overgrow
		case 15: // Pixilate (New)
			var UA = 1.3;
			break;
		case 18: // Reckless 
			var UA = 1.2;
			break;
		case 19: // Refrigerate (New)
			var UA = 1.3;
			break;
		case 20: // Rivalry +
			var UA = 1.25;
			break;
		case 21: // Rivalry -
			var UA = 0.75;
			break;
		case 28: // Strong Jaw (New)
			var UA = 1.5;
			break;
		case 29: // Swarm
		case 30: // Technician
			var UA = BasePower > 60 ? 1 : 1.5;
			break;
		case 32: // Torrent
			var UA = 1.5;
			break;
		case 33: // Tough Claws (New)
			var UA = 1.33;
			break;
		default: // Default Abilities 
			var UA = 1;
	};

	//User Abilities
	switch ($('atk_ability').selectedIndex) {
		case 4: // Dark Aura
			var AtkAbility = 1.33;
			break;
		case 5: // Fairy Aura
			var AtkAbility = 1.33;
			break;
		case 7: // Flower Gift
			var AtkAbility = 1.5;
			break;
		case 8: // Guts
			var AtkAbility = 1.5;
			break;
		case 9: // Huge Power
			var AtkAbility = 2;
			break;
		case 10: // Hustle
			var AtkAbility = 1.5;
			break;
		case 12: // Mega Launcher 
			var AtkAbility = 1.5;
			break;
		case 13: // Minus
			var AtkAbility = 1.5;
			break;
		case 16: // Plus
			var AtkAbility = 1.5;
			break;
		case 17: // Pure Power
			var AtkAbility = 2;
			break;
		case 22: //Sand Force (New)
			var AtkAbility = 1.3;
			break;
		case 23: //Sheer Force (New)
			var AtkAbility = 1.3;
			break; 
		case 25: // Slow Start
			var AtkAbility = 1.5;
			break;
		case 27: // Solar Power
			var AtkAbility = 1.5;
			break;
		default: // Default Abilities
			var AtkAbility = 1;
	}

	// More Ability Calcs (Attacker)
	switch ($('atk_ability').selectedIndex) {
		case 24: // Simple
			AtkMod *= 2;
			break;
		case 34: // Unaware
			DefMod = 0;
	}

	// defensive items
	switch ($('def_item').selectedIndex) {
		case 1: // Assault Vest (New)
			var DefItem = 1.5;
			break;
		case 3: // DeepSeaScale 
			var DefItem = 2;
			break;
		case 4: // Eviolite (New)
			var DefItem = 1.5;
			break;
		case 5: // Metal Powder
		case 6: // Soul Dew
			var DefItem = 1.5;
			break;
		default: // Default Items
			var DefItem = 1;
	}

	// Chilan Berry 
	var BRR = $('def_item').selectedIndex == 2 || ($('def_item').selectedIndex == 7 && Type1 * Type2 > 1) ? 0.5 : 1;

	// Filter Ability (Defense)
	var FLT = ($('def_ability').selectedIndex == 3 || $('def_ability').selectedIndex == 9) && Type1 * Type2 > 1 ? 0.75 : 1;

	// Friend Guard (New)
	var FG = ($('def_ability').selectedIndex == 5 && $('double').checked) ? 0.75 : 1;

	// Aura Break Ability
	var AB = ($('def_ability').selectedIndex == 1 && ($('atk_ability').selectedIndex == 4 || $('atk_ability').selectedIndex == 5)) ? 0.496241 : 1;

	// opposing abilities
	switch ($('def_ability').selectedIndex) {
		// Heat Proof
		case 6:
		// Thick Fat
		case 10:
			var FA = 0.5;
			break;
		// Dry Skin
		case 2:
			var FA = 1.25;
			break;
		// Default values, everything not specified multiplies damage calc by 1
		default:
			var FA = 1;
	};

	// Ability Calcs (Defender)
	switch ($('def_ability').selectedIndex) {
		case 11:
			AtkMod = 0;
			break;
		case 8:
			DefMod *= 2;
	}

	switch ($('def_ability').selectedIndex) {
		case 4:
		case 7:
			var DefAbil = 1.5;
			break;
		default:
			var DefAbil = 1;
	}

	// Base Power Calculation
	BasePower = Math.floor(Math.floor(Math.floor(Math.floor(Math.floor(Math.floor(BasePower * HH) * IT) * CHG * MS) * WS) * UA) * FA);
	
	//set AtkMod max and min to -6, and 6 
	AtkMod = Math.min(6, AtkMod);
	AtkMod = Math.max(-6, AtkMod);
	DefMod = Math.min(6, DefMod);
	DefMod = Math.max(-6, DefMod);

	// calculate if CH is > 1, 2nd or 3rd stage
	if (CH > 1) {
		AtkMod = Math.max(0, AtkMod);
		DefMod = Math.min(0, DefMod);
	};

	//Multiplies attack calculation by 1 if value in field is 0.
	if (AtkMod == 0) 
		AtkMod = 1;
	else //otherwise, use this calc in damage calculation. 
		AtkMod = Math.pow(1 + Math.abs(AtkMod) / 2, Math.abs(AtkMod) / AtkMod);

	//Multiplies def calculation by 1 if value in field is 0.
	if (DefMod == 0) 
		DefMod = 1;
	else //otherwise, use this calc in damage calculation. 
		DefMod = Math.pow(1 + Math.abs(DefMod) / 2, Math.abs(DefMod) / DefMod);

	// Using Attack Stat in Damage Calculation
	Atk = Math.floor(Math.floor(Math.floor(Atk * AtkMod) * AtkAbility) * AtkItem);

	// Using Defense Stat in Damage Calculation
	Def = Math.floor(Math.floor(Math.floor(Math.floor(Math.floor(Def * DefMod) * DefAbil) * DefItem) * SST) * selfD);

	// sets max attack stat based on attack stat calc
	Atk = Math.max(1, Atk);

	// set max def stat based on defense stat calc 
	Def = Math.max(1, Def);

	// calculation for based damage after all factors have been considered 
	var basedamage = Math.floor(Math.floor((Math.floor(Math.floor(Math.floor(Math.floor(Math.floor(Math.floor(Math.floor((Math.floor(Level * 2 / 5) + 2) * BasePower * Atk / 50) / Def) * BRN) * RL) * twoOpp) * SR) * FF) + 2) * CH * ITM) * TT * MF);
	
	// initialize damage variable to a new Array to push result into. 
	var damage = new Array();

	// range of damage values which fluctuate based on damage calcuations, items checked, etc.
	for (var i = 0; i < 16; i++)
		damage[i] = Math.max(1, Math.floor(Math.floor(Math.floor(Math.floor(Math.floor(Math.floor(Math.floor(Math.floor(Math.floor(basedamage * (85 + i) / 100) * STAB) * Type1) * Type2) * AB) * FG) * FLT) * EB) * BRR));

	$('damageresult').innerHTML = 'Damage: <strong>' + damage[0] + '-' + damage[15] + '</strong>';

	$('detaileddamage').innerHTML = '(' + damage.join(', ') + ')';
}