var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var MButton = (function (_super) {
    __extends(MButton, _super);
    function MButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MButton;
}(moon.BasicButton));
__reflect(MButton.prototype, "MButton");
;
var MImage = (function (_super) {
    __extends(MImage, _super);
    function MImage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MImage;
}(moon.Image));
__reflect(MImage.prototype, "MImage");
;
var ImageAnimation = (function (_super) {
    __extends(ImageAnimation, _super);
    function ImageAnimation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ImageAnimation;
}(moon.ImageAnimation));
__reflect(ImageAnimation.prototype, "ImageAnimation");
;
var Layout = (function (_super) {
    __extends(Layout, _super);
    function Layout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Layout;
}(moon.ImageLayout));
__reflect(Layout.prototype, "Layout");
;
var Scale9Image = (function (_super) {
    __extends(Scale9Image, _super);
    function Scale9Image() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Scale9Image;
}(moon.Scale9Image));
__reflect(Scale9Image.prototype, "Scale9Image");
;
var MoonEvent = (function (_super) {
    __extends(MoonEvent, _super);
    function MoonEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MoonEvent;
}(moon.MoonEvent));
__reflect(MoonEvent.prototype, "MoonEvent");
;
var GameData = (function (_super) {
    __extends(GameData, _super);
    function GameData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return GameData;
}(moon.GameData));
__reflect(GameData.prototype, "GameData");
;
var Const = (function (_super) {
    __extends(Const, _super);
    function Const() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Const;
}(moon.Const));
__reflect(Const.prototype, "Const");
;
var moon;
(function (moon) {
    /**游戏模版 */
    var BasicGamePanel = (function (_super) {
        __extends(BasicGamePanel, _super);
        function BasicGamePanel() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**加载到舞台之后调用 */
        BasicGamePanel.prototype.render = function () {
            _super.prototype.render.call(this);
            moon.GameData.stageWidth = this.stageWidth;
            moon.GameData.stageHeight = this.stageHeight;
            moon.GameData.stage = this.stage;
            this.initView();
        };
        BasicGamePanel.prototype.initView = function () {
            this.createBgGradientFill();
            this.txtScore = this.createText();
            this.txtLevel = this.createText(200);
            this.txtBlood = this.createText(400);
            this.panelSet = new BasicGameSet;
            this.panelSet.setBtnPos(4, 200);
            this.panelSet.addEvent(moon.MoonEvent.PAUSE, this.onSetHandler, this);
            this.panelSet.addEvent(moon.MoonEvent.PLAY, this.onSetHandler, this);
            this.panelSet.addEvent(moon.MoonEvent.CHANGE, this.onSetHandler, this);
            this.addChild(this.panelSet);
            this.panelStart = new BasicGameStart;
            this.panelStart.addEvent(moon.MoonEvent.START, this.start, this);
            this.addChild(this.panelStart);
            this.panelOver = new BasicGameOver;
            this.panelOver.addEvent(moon.MoonEvent.START, this.start, this);
            this.initGame();
        };
        BasicGamePanel.prototype.initGame = function () {
            this.level = 1;
            this.score = 0;
            this.blood = 200;
            this.updateBlood();
            this.updateLevel();
            this.updateScore();
        };
        BasicGamePanel.prototype.start = function (e) {
            this.initGame();
            this.play();
        };
        BasicGamePanel.prototype.loop = function (n) {
            this.blood--;
            this.score += 10;
            this.updateScore();
            this.updateBlood();
            return true;
        };
        BasicGamePanel.prototype.over = function () {
            this.addChild(this.panelOver);
            this.panelOver.alpha = 0;
            Tween.get(this.panelOver).to({ alpha: 1 }, 300);
            this.panelOver.update({ score: this.score, level: this.level });
            this.stop();
        };
        BasicGamePanel.prototype.updateLevel = function () {
            this.txtLevel.text = "level:" + this.level;
        };
        BasicGamePanel.prototype.updateScore = function () {
            this.txtScore.text = "score:" + this.score;
            if (this.score > 0 && this.score % 200 == 0) {
                this.level++;
                this.updateLevel();
            }
        };
        BasicGamePanel.prototype.updateBlood = function () {
            this.txtBlood.text = "blood:" + this.blood;
            if (this.blood == 0) {
                this.over();
            }
        };
        BasicGamePanel.prototype.onSetHandler = function (e) {
            if (e.type == moon.MoonEvent.PAUSE) {
                this.stop();
            }
            else if (e.type == moon.MoonEvent.PLAY) {
                this.play();
            }
            else {
                var value = e.data;
                if (e.dataType = "soundBg") {
                }
                else if (e.dataType = "soundEffect") {
                }
            }
        };
        BasicGamePanel.prototype.createImageBg = function (name) {
            this.addChild(new MImage(name));
        };
        BasicGamePanel.prototype.dispose = function () {
            this.stop();
            _super.prototype.dispose.call(this);
        };
        return BasicGamePanel;
    }(moon.GameView));
    moon.BasicGamePanel = BasicGamePanel;
    __reflect(BasicGamePanel.prototype, "moon.BasicGamePanel");
    /**游戏开始界面 */
    var BasicGameStart = (function (_super) {
        __extends(BasicGameStart, _super);
        function BasicGameStart() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**加载到舞台之后调用 */
        BasicGameStart.prototype.render = function () {
            _super.prototype.render.call(this);
            this.initView();
        };
        BasicGameStart.prototype.initView = function () {
            var bg = this.createBackground();
            bg.alpha = 0.5;
            this.createBtn("开始游戏");
            this.createTitle("游戏标题");
        };
        BasicGameStart.prototype.createBtn = function (value) {
            var btn = this.createButton(value);
            btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            btn.x = (this.stageWidth - btn.width) >> 1;
            btn.y = (this.stageHeight - btn.height) >> 1;
            return btn;
        };
        BasicGameStart.prototype.createTitle = function (value) {
            var title = this.createText(0, 0, value);
            title.x = (this.stageWidth - title.width) / 2;
            title.y = (this.stageHeight - title.height) / 2 - 100;
            return title;
        };
        BasicGameStart.prototype.onClick = function (e) {
            this.dispEvent(moon.MoonEvent.START);
            Tween.get(this).to({ alpha: 0 }, 300).call(this.backCall, this);
        };
        BasicGameStart.prototype.backCall = function (e) {
            this.removeFromParent();
        };
        BasicGameStart.prototype.createImageBg = function (name) {
            this.addChild(new MImage(name));
        };
        return BasicGameStart;
    }(moon.GameView));
    moon.BasicGameStart = BasicGameStart;
    __reflect(BasicGameStart.prototype, "moon.BasicGameStart");
    /**游戏结束界面 */
    var BasicGameOver = (function (_super) {
        __extends(BasicGameOver, _super);
        function BasicGameOver() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BasicGameOver.prototype.initView = function () {
            this.createBtn("再来一次");
            var btn = this.createBtn("排行榜");
            btn.y += 100;
            this.txtScore = this.createText();
            this.txtLevel = this.createText();
            this.rankPanel = new BasicGameRank;
        };
        BasicGameOver.prototype.update = function (data) {
            this.txtScore.text = "score:" + data["score"];
            this.txtLevel.text = "level:" + data["level"];
            this.txtScore.x = (this.stageWidth - this.txtScore.width) / 2;
            this.txtLevel.x = (this.stageWidth - this.txtLevel.width) / 2;
            this.txtScore.y = (this.stageHeight - this.txtScore.height) / 2 - 60;
            this.txtLevel.y = this.txtScore.y - 60;
        };
        BasicGameOver.prototype.onClick = function (e) {
            var btn = e.currentTarget;
            if (btn.label == "再来一次") {
                _super.prototype.onClick.call(this, e);
            }
            else {
                moon.GameData.stage.addChild(this.rankPanel);
            }
        };
        return BasicGameOver;
    }(BasicGameStart));
    moon.BasicGameOver = BasicGameOver;
    __reflect(BasicGameOver.prototype, "moon.BasicGameOver");
    /**游戏设置面板*/
    var BasicGameSet = (function (_super) {
        __extends(BasicGameSet, _super);
        function BasicGameSet() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BasicGameSet.prototype.render = function () {
            _super.prototype.render.call(this);
            this.initView();
        };
        BasicGameSet.prototype.initView = function () {
            var skin = this.getSkin();
            //skin.filters=[new egret.GlowFilter(0)];
            this.btnSet = new MButton(skin, this.getSkin());
            this.btnSet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.addChild(this.btnSet);
            if (this.btnSetPos) {
                this.btnSet.x = this.btnSetPos.x;
                this.btnSet.y = this.btnSetPos.y;
            }
            this.container = new Sprite;
            var containerBg = this.createBackground(0, 0.5);
            this.container.addChild(containerBg);
            var setbg = new moon.MoonDisplayObject;
            var bgWidth = this.stageWidth >> 1;
            var colorBg = 0XFF9900;
            setbg.type = moon.Const.SHAPE_RECT_ROUND;
            setbg.data = { w: bgWidth * 1.1, h: bgWidth, ew: 100, eh: 100, c: colorBg };
            setbg.setBackground(0XFFFFFF, 5);
            setbg.x = (containerBg.width - bgWidth) >> 1;
            setbg.y = (containerBg.height - bgWidth) >> 1;
            this.container.addChild(setbg);
            var label1 = new moon.Label("背景音乐", 0XFFFFFF);
            var label2 = new moon.Label("游戏音效", 0XFFFFFF);
            label1.textField.size = 40;
            label2.textField.size = 40;
            label1.x = label2.x = 50;
            label1.y = 50;
            label2.y = 150;
            setbg.addChild(label1);
            setbg.addChild(label2);
            var btn = this.getToggleSwitch();
            btn.x = label1.x + label1.width + 10;
            btn.y = label1.y - 5;
            setbg.addChild(btn);
            this.btnSoundBg = btn;
            var btn = this.getToggleSwitch();
            btn.x = label2.x + label2.width + 10;
            btn.y = label2.y - 5;
            setbg.addChild(btn);
            this.btnSoundEffect = btn;
            var button = new MButton();
            button.label = "关  闭";
            button.x = (setbg.width - button.width) >> 1;
            button.y = 240;
            button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            setbg.addChild(button);
            this.btnClose = button;
        };
        /**设置 */
        BasicGameSet.prototype.setBtnPos = function (x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            this.btnSetPos = new Point(x, y);
        };
        BasicGameSet.prototype.getSkin = function () {
            var colorBg = 0XFF9900;
            var colorIcon = 0X6A4000;
            var container = new Sprite;
            var bgWidth = 90;
            var bg = new moon.MoonDisplayObject;
            bg.type = moon.Const.SHAPE_RECT_ROUND;
            bg.data = { w: bgWidth, h: bgWidth, ew: 30, eh: 30, c: colorBg };
            bg.anchorOffsetX = bg.anchorOffsetY = bgWidth >> 1;
            container.addChild(bg);
            container.addChild(moon.MoonUI.getCircle(30, colorIcon));
            var len = 8;
            var rotation = 360 / len;
            for (var i = 0; i < len; i++) {
                var line = moon.MoonUI.getRect(15, 80, colorIcon);
                line.anchorOffsetX = line.width >> 1;
                line.anchorOffsetY = line.height >> 1;
                line.rotation = rotation * i;
                container.addChild(line);
            }
            container.addChild(moon.MoonUI.getCircle(20, colorBg));
            container.addChild(moon.MoonUI.getCircle(6, colorIcon));
            container.anchorOffsetX = container.anchorOffsetY = -(bgWidth / 2 + 4);
            return container;
        };
        BasicGameSet.prototype.getToggleSwitch = function () {
            var normal = moon.Skin.switchOn;
            var down = moon.Skin.switchOn;
            var normal2 = moon.MoonUI.getSwitch(moon.Color.bule, moon.Color.white);
            var down2 = moon.MoonUI.getSwitch(moon.Color.red, moon.Color.white);
            var btn = new moon.MoreSkinButton([normal, down, normal2, down2]);
            btn.toggleSwitch = true;
            btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            return btn;
        };
        BasicGameSet.prototype.onClick = function (e) {
            var btn = e.currentTarget;
            var value;
            if (btn == this.btnSet) {
                this.addChild(this.container);
                this.setValue();
                this.dispEvent(moon.MoonEvent.PAUSE);
            }
            else if (btn == this.btnSoundBg) {
                value = this.btnSoundBg.currentPage;
                alertAuto("背景音乐" + (value == 1 ? "开" : "关"), 1);
                BasicGameStorage.localWrite(BasicGameSet.SOUND_BG, value.toString());
                this.dispEvent(moon.MoonEvent.CHANGE, this.btnSoundBg.currentPage, "soundBg");
            }
            else if (btn == this.btnSoundEffect) {
                value = this.btnSoundEffect.currentPage;
                alertAuto("游戏音效" + (value == 1 ? "开" : "关"), 1);
                BasicGameStorage.localWrite(BasicGameSet.SOUND_EFFECT, value.toString());
                this.dispEvent(moon.MoonEvent.CHANGE, this.btnSoundEffect.currentPage, "soundEffect");
            }
            else if (btn == this.btnClose) {
                this.removeChild(this.container);
                this.dispEvent(moon.MoonEvent.PLAY);
            }
        };
        BasicGameSet.prototype.setValue = function () {
            var value = BasicGameStorage.localRead(BasicGameSet.SOUND_BG) || "1";
            this.btnSoundBg.updatePage(parseInt(value));
            var value = BasicGameStorage.localRead(BasicGameSet.SOUND_EFFECT) || "1";
            this.btnSoundEffect.updatePage(parseInt(value));
        };
        BasicGameSet.SOUND_BG = "sound bg";
        BasicGameSet.SOUND_EFFECT = "sound effect";
        return BasicGameSet;
    }(moon.BasicView));
    moon.BasicGameSet = BasicGameSet;
    __reflect(BasicGameSet.prototype, "moon.BasicGameSet");
    /**游戏积分排行板*/
    var BasicGameRank = (function (_super) {
        __extends(BasicGameRank, _super);
        function BasicGameRank() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.items = [];
            return _this;
        }
        BasicGameRank.prototype.render = function () {
            _super.prototype.render.call(this);
            this.initView();
        };
        BasicGameRank.prototype.initView = function () {
            this.createBackground(0, 0.5);
            var rankBg = moon.MoonUI.getRect(this.stageWidth - 100, this.stageHeight - 200, 0);
            rankBg.alpha = 0.8;
            this.addChild(rankBg);
            Layout.getIns().setCenterXByPanent(rankBg);
            Layout.getIns().setCenterYByPanent(rankBg);
            var rect = new Rectangle(rankBg.x, rankBg.y, rankBg.width, rankBg.height);
            var dis = 60;
            var line = new Sprite;
            line.graphics.lineStyle(2, 0XFFFFFF);
            line.graphics.moveTo(rect.x, rect.y + dis);
            line.graphics.lineTo(rect.x, rect.y);
            line.graphics.lineTo(rect.right, rect.y);
            line.graphics.lineTo(rect.right, rect.bottom);
            line.graphics.lineTo(rect.x, rect.bottom);
            line.graphics.lineTo(rect.x, rect.y + dis);
            line.graphics.lineTo(rect.right, rect.y + dis);
            this.addChild(line);
            var xnum = 30;
            var btnSkin = moon.MoonUI.getCircle(xnum, 0xffffff);
            var skinX = moon.MoonUI.getX(xnum >> 1, xnum >> 1, 0x00ff00, 4);
            skinX.anchorOffsetX = skinX.anchorOffsetY = xnum >> 2;
            btnSkin.addChild(skinX);
            var btn = new MButton(btnSkin, btnSkin);
            btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.addChild(btn);
            btn.x = rankBg.x + rankBg.width;
            btn.y = rankBg.y;
            var txt = this.createText(0, 0, "分数排行榜");
            Layout.getIns().setCenterXByPanent(txt);
            txt.y = rankBg.y + (dis - txt.height) / 2;
            this.addChild(txt);
            var txt = this.createText(rankBg.x, rankBg.y + dis);
            this.addChild(txt);
            this.txtRank = txt;
            this.conatiner = new Sprite;
            this.addChild(this.conatiner);
            var itemw = rankBg.width - 2;
            for (var i = 0; i < 50; i++) {
                var item = new RankItem(itemw, i);
                this.conatiner.addChild(item);
                this.items.push(item);
            }
            moon.SimpleLayout.displayRank(this.items, 1);
            var scrollBar = new moon.ScrollBar();
            scrollBar.target = this.conatiner;
            scrollBar.setSize(rect.width, rect.height - dis - 2);
            scrollBar.layout(moon.Const.VERTICAL);
            this.addChild(scrollBar);
            scrollBar.x = rect.x + 1;
            scrollBar.y = rect.y + dis + 2;
        };
        BasicGameRank.prototype.onClick = function (e) {
            this.removeFromParent();
        };
        BasicGameRank.prototype.update = function (data) {
            for (var i = 1; i < 10; i++) {
                //this.txtScore
            }
        };
        return BasicGameRank;
    }(moon.BasicView));
    moon.BasicGameRank = BasicGameRank;
    __reflect(BasicGameRank.prototype, "moon.BasicGameRank");
    var RankItem = (function (_super) {
        __extends(RankItem, _super);
        function RankItem(w, rank) {
            var _this = _super.call(this) || this;
            _this.colors = [0, 0XDD823B, 0XD2A85E, 0XDFD164];
            _this.w = w;
            _this.rank = rank + 1;
            _this.initView();
            return _this;
        }
        RankItem.prototype.initView = function () {
            var bg = this.createRect(this.w, 80, 0);
            bg.alpha = this.rank % 2 == 0 ? 0.6 : 0.1;
            this.addChild(bg);
            this.txtRank = this.createText(100, 0);
            this.txtScore = this.createText(400, 0);
            if (this.rank <= 3) {
                this.txtRank.textColor = this.txtScore.textColor = this.colors[this.rank];
            }
            this.txtRank.text = String(this.rank);
            this.txtScore.text = String(10000 - this.rank);
            Layout.getIns().setCenterYByPanent(this.txtRank);
            Layout.getIns().setCenterYByPanent(this.txtScore);
        };
        return RankItem;
    }(moon.BasicView));
    moon.RankItem = RankItem;
    __reflect(RankItem.prototype, "moon.RankItem");
    /**游戏数据存储*/
    var BasicGameStorage = (function () {
        function BasicGameStorage() {
        }
        /**只能内部访问,在外部修改gameId */
        BasicGameStorage.getGameIdKey = function (key) { return moon.GameData.gameId + key; };
        /**本地 数据写入*/
        BasicGameStorage.localWrite = function (key, value) {
            egret.localStorage.setItem(this.getGameIdKey(key), value);
        };
        /**本地 数据读取*/
        BasicGameStorage.localRead = function (key) {
            return egret.localStorage.getItem(this.getGameIdKey(key));
        };
        /**本地 数据删除*/
        BasicGameStorage.localRemove = function (key) {
            egret.localStorage.removeItem(this.getGameIdKey(key));
        };
        /**本地 数据清空*/
        BasicGameStorage.localClear = function () {
            egret.localStorage.clear();
        };
        /**服务器 数据写入*/
        BasicGameStorage.serverWrite = function () { };
        /**服务器 数据读取*/
        BasicGameStorage.serverRead = function () { return ""; };
        /**服务器 数据删除*/
        BasicGameStorage.serverRemove = function () { };
        return BasicGameStorage;
    }());
    moon.BasicGameStorage = BasicGameStorage;
    __reflect(BasicGameStorage.prototype, "moon.BasicGameStorage");
})(moon || (moon = {}));
//# sourceMappingURL=MoonGame.js.map