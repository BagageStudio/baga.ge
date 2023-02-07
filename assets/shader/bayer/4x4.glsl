float dither4x4(vec2 position,float brightness){
    int x=int(mod(position.x,4.));
    int y=int(mod(position.y,4.));
    int index=x+y*4;
    float limit=0.;
    
    if(x<8){
        if(index==0)limit=.0625;
        if(index==1)limit=.5625;
        if(index==2)limit=.1875;
        if(index==3)limit=.6875;
        if(index==4)limit=.8125;
        if(index==5)limit=.3125;
        if(index==6)limit=.9375;
        if(index==7)limit=.4375;
        if(index==8)limit=.25;
        if(index==9)limit=.75;
        if(index==10)limit=.125;
        if(index==11)limit=.625;
        if(index==12)limit=1.;
        if(index==13)limit=.5;
        if(index==14)limit=.875;
        if(index==15)limit=.375;
    }
    
    return brightness<limit?0.:1.;
}

#pragma glslify:export(dither4x4)