export function GET(
    req:Request,
    {params}:{params:{userid:string}}
){
    return Response.json({userId:params.userid})
}