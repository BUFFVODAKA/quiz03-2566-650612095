import { DB, readDB, writeDB } from "@/app/libs/DB";
import { checkToken } from "@/app/libs/checkToken";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  readDB();
  
  const roomId = request.nextUrl.searchParams.get("roomId");
  const foundroom = DB.messages.find((x) => x.roomId === roomId);
  if (!foundroom) {
    return NextResponse.json(
      {
        ok: false,
        message: `Room is not found`,
      },
      { status: 404 }
    );
  }
  const messages = DB.messages.filter((x) => x.roomId === roomId);
  return NextResponse.json({
    ok: true,
    message: messages,
  });
};
 
// return NextResponse.json(
//   {
//     ok: true,
//     roomid: DB.roomid,
//     messageId: DB.messageId,
//     messageText: DB.messageText

//   }
// )


export const POST = async (request) => {
  readDB();

  return NextResponse.json(
    {
      ok: false,
      message: `Room is not found`,
    },
    { status: 404 }
  );

  const messageId = nanoid();

  writeDB();

  return NextResponse.json({
    ok: true,
    messageId: DB.messageId,
    message: "Message has been sent",
  });
};

export const DELETE = async (request) => {
  const payload = checkToken();
  if(!payload){
  return NextResponse.json(
    {
      ok: false,
      message: "Invalid token",
    },
    { status: 401 }
  );
  }

  readDB();
  // const rawAuthHeader = headers().get("authorization");
  // const token = rawAuthHeader.split(" ")[1];
  // let username = null;
  // let role = null;

  // try {
  //   const payload = jwt.verify(token, process.env.JWT_SECRET);
  //   studentId = payload.studentId;
  //   role = payload.role;
  // } catch {
  //   return NextResponse.json(
  //     {
  //       ok: false,
  //       message: "Invalid token",
  //     },
  //     { status: 401 }
  //   );
  // }

  // if (role === "ADMIN") {
  //   return NextResponse.json(
  //     {
  //       ok: true,
  //       message: "Only Student can access this API route",
  //     },
  //     { status: 403 }
  //   );
  // } else {
  //   const body = await request.json();
  //   const { courseNo } = body;
  //   if (typeof courseNo !== "string" || courseNo.length !== 6) {
  //     return NextResponse.json(
  //       {
  //         ok: false,
  //         message: "courseNo must contain 6 characters",
  //       },
  //       { status: 400 }
  //     );
  //   }

  // return NextResponse.json(
  //   {
  //     ok: false,
  //     message: "Message is not found",
  //   },
  //   { status: 404 }
  // );

  writeDB();

  return NextResponse.json({
    ok: true,
    message: "Message has been deleted",
  });
};
