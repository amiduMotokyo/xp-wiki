// ==UserScript==
// @name         XP团定制
// @author       苦叶茶
// @version      240201+b
// @license      WTFPL
// @homepageURL  https://xp-wiki.netlify.app/
// ==/UserScript==

let ext = seal.ext.find('xp');
if (!ext) {
	ext = seal.ext.new('xp', '苦叶茶', '1.0.0');
	seal.ext.register(ext);
}
const storage_dir = "data/default/extensions/xp/"

const cmd1 = seal.ext.newCmdItemInfo();
cmd1.name = 'dmg';
cmd1.help = '自动计算伤害';
cmd1.solve = (ctx, msg, cmdArgs) => {
	let text = "对抗伤害计算：\n";
	let diff = seal.vars.intGet(ctx, "$g上次对抗差值")[0];
	const pattern = seal.vars.strGet(ctx, "$g上次击中部位")[0];
	const player1 = seal.vars.strGet(ctx, "$g上次对抗玩家A");
	const player2 = seal.vars.strGet(ctx, "$g上次对抗玩家B");
	const winflag = seal.vars.intGet(ctx, "$g上次对抗结果")[0];
	if (!player1[1] || !player2[1]) {
		text += `没有进行过对抗！`;
	}
	else {
		const mctx1 = seal.getCtxProxyByUid(ctx, player1[0]);
		const mctx2 = seal.getCtxProxyByUid(ctx, player2[0]);
		let winner = null, loser = null;
		if (winflag > 0) {
			// 后手胜利
			winner = mctx2;
			loser = mctx1;
			diff *= -1
		}
		else {
			// 先手胜利
			winner = mctx1;
			loser = mctx2;
		}
		// 取参数并计算
		function get_player_attr(mctx, name) {
			const p = seal.vars.intGet(mctx, name)[0] + 0.0;
			const d = seal.vars.intGet(mctx, name + "除数")[0];
			return 0 != d ? p / d : p;
		}
		const pattern_map = [
			"皮鼓",
			"头部",
			"左手",
			"右手",
			"躯干",
			"左脚",
			"右脚",
		];
		const ptn1 = seal.vars.intGet(mctx1, "瞄准部位");
		const pattern_f = ptn1[1] ? pattern_map[ptn1[0] % pattern_map.length] : pattern;
		const pwr1 = get_player_attr(mctx1, "威力"),
			pwr2 = get_player_attr(mctx2, "威力"),
			arm2 = get_player_attr(mctx2, pattern_f + "护甲"),
			def2 = get_player_attr(mctx2, pattern_f + "减伤") / 100.0;
		let fac_pwr1 = get_player_attr(mctx1, "威力倍率") / 100.0,
			fac_diff = get_player_attr(mctx1, "因子倍率") / 100.0,
			fac_sum = get_player_attr(mctx1, "总伤倍率") / 100.0,
			add_sum = get_player_attr(mctx1, "额外伤害");
		fac_pwr1 = fac_pwr1 > 0 ? fac_pwr1 : 1;
		fac_diff = fac_diff > 0 ? fac_diff : 1;
		fac_sum = fac_sum > 0 ? fac_sum : 1;
		const fix1 = seal.vars.intGet(mctx1, "检定补正")[0],
			fix2 = seal.vars.intGet(mctx2, "检定补正")[0];
		const factor = Math.floor((diff - (fix1 - fix2)) / 10);
		let dmg = (pwr1 * fac_pwr1 + factor * fac_diff + add_sum - arm2) * fac_sum,
			dmg_vs = (pwr1 * fac_pwr1 + factor * fac_diff + add_sum - arm2 - pwr2 / 2) * fac_sum,
			dmg_mgc = (pwr1 * fac_pwr1 + factor * fac_diff + add_sum) * fac_sum;
		dmg = Math.max(dmg, 0);
		dmg_mgc = Math.max(dmg_mgc, 0);
		// 文本生成
		text += `对抗双方为<${mctx1.player.name}>、<${mctx2.player.name}>，胜者是<${winner.player.name}>！\n`
		text += `差值伤害因子为${factor}，击中部位为${pattern_f}！\n`;
		text += `进攻威力为${pwr1}，防守威力为${pwr2}！\n`;
		text += `防守${pattern_f}护甲值为${arm2}，${pattern_f}减伤率为${def2}！\n`;
		text += `额外伤害${add_sum}，威力倍率${fac_pwr1}，因子倍率${fac_diff}，总伤倍率${fac_sum}！\n`;
		text += `进攻检定补正为${fix1}，防守检定补正为${fix2}！\n`;
		const tablen = 10, tabchr = ' ';
		text += "\n" + "　　　　|".padStart(tablen, tabchr)
				+ "护甲|".padStart(tablen, tabchr) + "血量|".padStart(tablen, tabchr);
		text += "\n" + "闪避失败|".padStart(tablen, tabchr)
				+ `${(dmg * def2).toFixed(2)}|`.padStart(tablen, tabchr)
				+ `${(dmg * (1.0 - def2)).toFixed(2)}|`.padStart(tablen, tabchr);
		text += "\n" + "防御成功|".padStart(tablen, tabchr)
				+ `${(dmg * 0.25 * def2).toFixed(2)}|`.padStart(tablen, tabchr)
				+ `${(dmg * 0.25 * (1.0 - def2)).toFixed(2)}|`.padStart(tablen, tabchr);
		text += "\n" + "防御失败|".padStart(tablen, tabchr)
				+ `${(dmg * 0.75 * def2).toFixed(2)}|`.padStart(tablen, tabchr)
				+ `${(dmg * 0.75 * (1.0 - def2)).toFixed(2)}|`.padStart(tablen, tabchr);
		text += "\n" + "魔法成功|".padStart(tablen, tabchr)
				+ `${(0).toFixed(2)}|`.padStart(tablen, tabchr)
				+ `${(dmg_mgc).toFixed(2)}|`.padStart(tablen, tabchr);
		text += "\n" + "　　拼刀|".padStart(tablen, tabchr)
				+ `${(dmg_vs * def2).toFixed(2)}|`.padStart(tablen, tabchr)
				+ `${(dmg_vs * (1.0 - def2)).toFixed(2)}|`.padStart(tablen, tabchr);
		// 参数重置
		seal.vars.del(mctx1, "检定补正");
		seal.vars.del(mctx2, "检定补正");
		seal.vars.del(mctx1, "瞄准部位");
		seal.vars.del(mctx2, "瞄准部位");
	}
	seal.replyToSender(ctx, msg, text);
	return seal.ext.newCmdExecuteResult(true);
};
ext.cmdMap['dmg'] = cmd1;

const cmd2 = seal.ext.newCmdItemInfo();
cmd2.name = '投稿';
cmd2.help = '应用当前最新XP团角色与XP团设定数据库';
cmd2.solve = (ctx, msg, cmdArgs) => {
	if (ctx.privilegeLevel < 100) {
		return seal.ext.newCmdExecuteResult(false);
	}
	// 拉取
	seal.replyToSender(ctx, msg, "正在拉取……");
	let text = exec_cmd("git", ...("-C xp-wiki/ pull origin master --rebase".split(' ')));
	console.log(text);

	seal.replyToSender(ctx, msg, "正在生成……");
	// 读取1
	let csv = read_file("xp-wiki/site/temp/qbot/characters.csv").replace("\r\n", "\n");
	let data = [];
	const records1 = csv.split("\n");
	for (var i = 1; i < records1.length; ++i) {
		if (records1[i].length <= 0) {
			continue;
		}
		let record = records1[i].split(",");
		if (null == record[2] || record[2].length <= 0) {
			record.splice(2, 1);
		}
		else {
			record[2] = "相关战役：".concat(record[2]);
		}
		if (null == record[1] || record[1].length <= 0) {
			record.splice(1, 1);
		}
		else {
			record[1] = "PL：".concat(record[1]);
		}
		data.push(record.join("\r\n"));
	}
	if (data.length > 0) {
		mkdir(storage_dir);
		write_file(storage_dir + "characters.json", JSON.stringify(data));
	}

	// 读取2
	csv = read_file("xp-wiki/site/temp/qbot/tips.csv").replace("\r\n", "\n");
	data = [];
	const records2 = csv.split("\n");
	for (var i = 1; i < records2.length; ++i) {
		if (records2[i].length <= 0) {
			continue;
		}
		let record = records2[i].split(",");
		for (var j = 0; j < record.length; ++j) {
			record[j] = record[j].replace("\\n", "\r\n");
		}
		data.push(record.join("\r\n"));
	}
	if (data.length > 0) {
		mkdir(storage_dir);
		write_file(storage_dir + "tips.json", JSON.stringify(data));
	}

	text = exec_cmd("git", ...("-C xp-wiki/ rev-parse HEAD".split(' ')));
	seal.replyToSender(ctx, msg, "生成完成！当前版本：" + text);
	return seal.ext.newCmdExecuteResult(true);
};
ext.cmdMap['投稿'] = cmd2;

const cmd3 = seal.ext.newCmdItemInfo();
cmd3.name = 'XP团角色';
cmd3.help = '';
cmd3.solve = (ctx, msg, cmdArgs) => {
	let data = JSON.parse(read_file(storage_dir + "characters.json"));
	let history = [];
	let history_data = seal.vars.strGet(ctx, "$g_characters_history");
	if (history_data[1]) {
		history = JSON.parse(history_data[0]);
	}

	let i = 0;
	do {
		i = Math.floor(Math.random() * data.length);
	} while (history.indexOf(i) >= 0);
	history.push(i);
	history.splice(0, history.length - data.length / 2);

	console.log(history);
	seal.vars.strSet(ctx, "$g_characters_history", JSON.stringify(history));
	let text = "关于XP团往期角色：" + data[i];

	seal.replyToSender(ctx, msg, text);
	return seal.ext.newCmdExecuteResult(true);
};
ext.cmdMap['XP团角色'] = cmd3;

const cmd4 = seal.ext.newCmdItemInfo();
cmd4.name = 'XP团';
cmd4.help = '';
cmd4.solve = (ctx, msg, cmdArgs) => {
	let data = JSON.parse(read_file(storage_dir + "tips.json"));
	let history = [];
	let history_data = seal.vars.strGet(ctx, "$g_tips_history");
	if (history_data[1]) {
		history = JSON.parse(history_data[0]);
	}

	let i = 0;
	do {
		i = Math.floor(Math.random() * data.length);
	} while (history.indexOf(i) >= 0);
	history.push(i);
	history.splice(0, history.length - data.length / 2);

	console.log(history);
	seal.vars.strSet(ctx, "$g_tips_history", JSON.stringify(history));
	let text = "关于艾克苏普世界的小知识：\n" + data[i];

	seal.replyToSender(ctx, msg, text);
	return seal.ext.newCmdExecuteResult(true);
};
ext.cmdMap['XP团'] = cmd4;

const cmd5 = seal.ext.newCmdItemInfo();
cmd5.name = '随机武器';
cmd5.help = '随机抽取一个武器，格式如下：\n.随机武器 模式 名称 等级\n模式：0-全随机，1-按大类随机，2-按武器系随机，3-按武器变体随机\n名称：模式为1/2/3时，指定目标名称\n等级：1-15（未实装）\n示例：.随机武器 1 远程武器 10';
cmd5.solve = (ctx, msg, cmdArgs) => {
	let mode = cmdArgs.getArgN(1);
	let name = cmdArgs.getArgN(2);
	let level = cmdArgs.getArgN(3);
	// 参数有效性检查
    if (!mode || !name || !level) {
        seal.replyToSender(ctx, msg, "随机抽取一个武器，格式如下：\n.随机武器 模式 名称 等级\n模式：0-全随机，1-按大类随机，2-按武器系随机，3-按武器变体随机\n名称：模式为1/2/3时，指定目标名称\n等级：1-15（未实装）\n示例：.随机武器 1 远程武器 10");
        return seal.ext.newCmdExecuteResult(true);
    }
	// 转换数字类型参数
    const numMode = parseInt(mode);
    const numLevel = parseInt(level);
    if (isNaN(numMode) || isNaN(numLevel)) {
        seal.replyToSender(ctx, msg, "模式和等级必须是数字");
        return seal.ext.newCmdExecuteResult(true);
    }

	const encodedName = encodeURIComponent(name);

	const url = `http://localhost:3000/weapon?mode=${numMode}&name=${encodedName}&level=${numLevel}`;

	let text = "随机武器结果：\n";

	fetch(url)
                .then((response) => {
                    // 判断响应状态码是否为 200
                    if (response.ok) {
                        return response.json();
                    } 
					else if(response.status == 404)
					{
						text += `未找到武器信息！`;
						seal.replyToSender(ctx, msg, text);
					}
					else
					{
                        console.log("api失效！请联系作者。");
                    }
                })
                .then((data) => {
					const category = data.weaponInfo ? data.weaponInfo.大类 : '未知大类'; // 获取第一列
            		if (data.success) {
                		text += `武器大类：${category}\n`;  // 显示大类信息
						text += `武器系：${data.weaponInfo.子类 || '未知'}\n`;
						text += `变体：${data.weaponInfo.变体 || '未知'}\n`;
						text += `挂钩属性：${data.weaponInfo.挂钩属性 || '未知'}\n`;
						text += `攻击范围：${data.weaponInfo.攻击范围 || '未知'}\n`;
						text += `武器威力：${data.weaponInfo.武器威力 || '未知'}\n`;
						if(data.weaponInfo.施法范围 > 1)
						{
							text += `施法范围：${data.weaponInfo.施法范围 || '未知'}\n`;
						}
						if(data.weaponInfo.初始弹药量 > 0)
						{
							if(data.weaponInfo.子类 == '短棍')
							{
								text += `战技使用次数：${data.weaponInfo.初始弹药量 || '未知'}\n`;
							}
							else if(data.weaponInfo.变体 == '短斧' || data.weaponInfo.变体 == '手戟')
							{
								text += `备用武器最大持有量：${data.weaponInfo.初始弹药量 || '未知'}\n`;
							}
							else
							{
								text += `初始弹药量：${data.weaponInfo.初始弹药量 || '未知'}\n`;
							}	
						}
						text += `特殊效果：\n${data.weaponInfo.特殊效果 || '未知'}\n`;
						if(data.weaponInfo.是否有属性加成 > 0)
						{
							text += `有属性加成`;
						}
            		} else {
                		text += `随机失败，失败原因：${data.error || "未知错误"}`;
            		}
					seal.replyToSender(ctx, msg, text);
                })
	return seal.ext.newCmdExecuteResult(true);
};
ext.cmdMap['随机武器'] = cmd5;