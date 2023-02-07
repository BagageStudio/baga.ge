float dither2x2(vec2 position,float brightness){
    int x=int(mod(position.x,2.));
    int y=int(mod(position.y,2.));
    int index=x+y*2;
    float limit=0.;
    
    if(x<8){
        if(index==0)limit=.25;
        if(index==1)limit=.75;
        if(index==2)limit=1.;
        if(index==3)limit=.50;
    }
    
    return brightness<limit?0.:1.;
}

#pragma glslify:export(dither2x2)