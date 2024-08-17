import { NextResponse } from "next/server";
const isLog=true;
export  function middleware(request){
if(isLog){
    return NextResponse.next();
}

return NextResponse.redirect(new URL('/', request.url));

}

 export const config = {
    matcher:['/login','/test','/todo']
}


