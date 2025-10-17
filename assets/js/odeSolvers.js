/*
 rk4 computes the next step in the approximation of the differential equation dx/dt = vx(x,t)
 $param: x array of states
 $param: vx a functions able to compute the velocity of change given x and t. The function should return
         an array of speeds.
 $param: h stepsize
 $return: new state array;
 */
function rk4(x,vx,h,t)
{
 	var xn;
	var F1 = VtimesA(vx(x,t),h);
	var th = t+h/2
	var F2 = VtimesA(vx(Vadd(x,VtimesA(F1,0.5)),th),h);
	var F3 = VtimesA(vx(Vadd(x,VtimesA(F2,0.5)),th),h);
	var F4 = VtimesA(vx(Vadd(x,F3),t+h),h);
	xn=VtimesA(Vadd(F1,Vadd(F2,Vadd(F3,F4))),1/6);
	xn=Vadd(x,xn);
	return xn;
}

/*
	Vadd: adds two equal sized vectors
	$param: x first vector
	$param: y second vector
	$return: sum vector

 */
function Vadd(x,y)
{
	var t=[];
	var l=x.length;
	if(x.length == y.length )
	{
		var  i =0;
		for(i=0;i<l;i++)
		{
			t[i]=x[i]+y[i];
		}
	}
	return t;
}

/*
	VtimesA: multiplies a vector with a number
	$param: x first vector
	$param: a scalar of te vector
	$return: vector

 */
function VtimesA(x,a)
{
	var t=[];
	var l=x.length;
	var  i =0;
	for(i=0;i<l;i++)
	{
		t[i]=a*x[i];
	}
	return t;
}