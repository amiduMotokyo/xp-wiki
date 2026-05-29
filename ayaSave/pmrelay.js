// ==UserScript==
// @name         私聊转群插件
// @author       Claude
// @version      1.0.0
// @description  在群里设置开关，将私聊内容自动转发到群里
// @timestamp    1685000000
// @license      Apache-2
// @homepageURL  https://github.com/sealdice/javascript
// ==/UserScript==

let ext = seal.ext.find('pmrelay');
if (!ext) {
  ext = seal.ext.new('pmrelay', 'Claude', '1.0.0');
  seal.ext.register(ext);
}

// 用于存储启用转发的群ID列表
// 存储格式: ext.storageSet('pmrelay_groups', JSON.stringify(groupIds))

const cmd = seal.ext.newCmdItemInfo();
cmd.name = 'pmrelay';
cmd.help = `私聊转群开关
.pmrelay 开启 - 在当前群启用私聊转群功能
.pmrelay 关闭 - 在当前群关闭私聊转群功能
.pmrelay 状态 - 查看当前群的私聊转群功能状态`;

cmd.solve = (ctx, msg, cmdArgs) => {
  // 只能在群里使用
  if (ctx.isPrivate) {
    seal.replyToSender(ctx, msg, '此指令只能在群里使用');
    return seal.ext.newCmdExecuteResult(true);
  }

  let op = cmdArgs.getArgN(1);
  let groupId = ctx.group.groupId;
  let enabledGroups = JSON.parse(ext.storageGet('pmrelay_groups') || '[]');

  switch (op) {
    case '开启': {
      if (enabledGroups.includes(groupId)) {
        seal.replyToSender(ctx, msg, '私聊转群功能已经开启');
      } else {
        enabledGroups.push(groupId);
        ext.storageSet('pmrelay_groups', JSON.stringify(enabledGroups));
        seal.replyToSender(ctx, msg, '✓ 私聊转群功能已开启\n现在任何人的私聊都会被转发到这个群');
      }
      return seal.ext.newCmdExecuteResult(true);
    }
    case '关闭': {
      let idx = enabledGroups.indexOf(groupId);
      if (idx === -1) {
        seal.replyToSender(ctx, msg, '私聊转群功能未开启');
      } else {
        enabledGroups.splice(idx, 1);
        ext.storageSet('pmrelay_groups', JSON.stringify(enabledGroups));
        seal.replyToSender(ctx, msg, '✓ 私聊转群功能已关闭');
      }
      return seal.ext.newCmdExecuteResult(true);
    }
    case '状态': {
      if (enabledGroups.includes(groupId)) {
        seal.replyToSender(ctx, msg, '✓ 当前群的私聊转群功能: 已开启');
      } else {
        seal.replyToSender(ctx, msg, '✗ 当前群的私聊转群功能: 已关闭');
      }
      return seal.ext.newCmdExecuteResult(true);
    }
    default: {
      const ret = seal.ext.newCmdExecuteResult(true);
      ret.showHelp = true;
      return ret;
    }
  }
};

ext.cmdMap['pmrelay'] = cmd;

// 监听所有消息，检查是否是私聊，然后转发到启用了该功能的群
ext.onNotCommandReceived = (ctx, msg) => {
  // 只处理私聊消息
  if (!ctx.isPrivate || msg.messageType !== 'private') {
    return;
  }

  let enabledGroups = JSON.parse(ext.storageGet('pmrelay_groups') || '[]');

  // 如果没有群启用了该功能，直接返回
  if (enabledGroups.length === 0) {
    return;
  }

  // 获取发送者信息
  let senderName = msg.sender.nickname || msg.sender.userId;
  let pmText = msg.message;

  // 遍历所有启用了该功能的群，转发消息
  enabledGroups.forEach((groupId) => {
    // 创建一个用于群发送的消息对象
    let tempMsg = seal.newMessage();
    tempMsg.groupId = groupId;
    tempMsg.messageType = 'group';

    // 使用当前的端点（骰子自身）创建临时上下文
    let tempCtx = seal.createTempCtx(ctx.endPoint, tempMsg);

    // 构造转发文本
    let relayText = `${pmText}`;

    // 在群里回复
    seal.replyToSender(tempCtx, tempMsg, relayText);
  });
};
