class BView extends moon.PanelBar
{
    public constructor()
    {
        super(0,0);
    }
    protected createCloseBtn():void
    {
        var btn:moon.BasicButton=new moon.BasicButton();
        btn.label="关闭";
        this.addChild(btn);
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.close,this)
    }
    protected close(e:egret.TouchEvent):void
    {
        this.dispEvent(moon.MoonEvent.CLOSE)
        this.removeFromParent(true);
    }
}