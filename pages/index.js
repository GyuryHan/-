import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

function Homepage(props) {
  return (
    <>
      <Head>
        <title>생각어플</title>
        <meta
          name="description"
          content="익명이 보장되고 세상의 모든 잡생각을 공유하는 어플입니다"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

//SSG Page
// api 패칭 완료된 후 페이지가 렌더링 되도록 함 (component에서 불가능 pages 폴더 안에 있는 것만 가능)
// 밑에 getServerSideProps() 보다 빠름 (항상 다시 만드는 대신 캐시하고 다시 사용하기 때문에)
// 데이터가 항상 변하지 않는 경우엔 이방식으로 사용

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://gyury:rbflwkd7@cluster0.0ds2zww.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
    // (1초에 한 번씩 데이터 받아옴. 데이터 변경되는 시간을 넣어주면됨)
  };
}

// 페이지 요청 들어올 때마다 프리 제너레이트
// 항상 바뀌는 데이터가 없다면 getStaticProps() 가 나음
// 인증과 같이 req 필요한 경우는 이방식으로 사용해야함

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   return {
//     props: {
//       meetups: DUMMY_DATA,
//     },
//   };
// }

export default Homepage;
