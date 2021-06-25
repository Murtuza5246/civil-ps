import dynamic from "next/dynamic";
import Head from "next/head";
import { apiDomain } from "../../../../apiPath.js";
// import UserProfile from "../../../components/UserProfile/UserProfile";
const UserProfile = dynamic(
  async () => {
    return import("../../../../components/UserProfile/UserProfile.js");
  },
  { ssr: false }
);
const UserProfilePage = ({ data, description }) => {
  let tagsData = null;
  if (data.userDetails) {
    tagsData = data.userDetails[0];
  }
  if (!tagsData) {
    return (
      <div>
        {" "}
        <Head>
          <title>No user found</title>
        </Head>
        <UserProfile data={data} />
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>
          {tagsData.fName
            ? "Profile - " + tagsData.fName + " " + tagsData.lName
            : "Loading..."}
        </title>

        <meta
          id="og-title"
          property="og:title"
          content={tagsData.fName + " " + tagsData.lName}
        />
        <meta
          id="og-image"
          property="og:image"
          content={
            tagsData._id && tagsData._id
              ? `${apiDomain}/image/profile/${data._id}`
              : `${apiDomain}/websiteLogo/newlogo.jpg`
          }
        />
        <meta property="og:site_name" content="problemspotter" />

        <meta
          property="og:image"
          itemprop="image"
          content={
            tagsData.profileImage
              ? `${apiDomain}/image/profile/${tagsData._id}`
              : `${apiDomain}/websiteLogo/newlogo.jpg`
          }
        />
        <meta
          name="msapplication-TileImage"
          content={
            tagsData.profileImage
            ? `${apiDomain}/image/profile/${tagsData._id}`
            : `${apiDomain}/websiteLogo/newlogo.jpg`
          }
        ></meta>
        <meta property="og:type" content="website" />
        <meta property="og:updated_time" content="1440432930" />
        <meta
          property="og:url"
          content={"https://civil.problemspotter.com/data/details/" + tagsData._id}
        ></meta>
        <meta property="og:type" content="website" />
        <meta property="og:image:type" content="image/jpeg"></meta>
        <meta property="og:image:width" content="300"></meta>
        <meta property="og:image:height" content="300"></meta>
        <meta
          name="twitter:title"
          content={"Profile - " + tagsData.fName + " " + tagsData.lName}
        />

        <meta charset="UTF-8" />
        <meta name="description" content={description} />
        <meta
          name="keywords"
          content="civil engineering, construction problems, construction problems on problemspotter, construction problems database"
        ></meta>
        <meta
          name="author"
          content={tagsData.fName + " " + tagsData.lName}
        ></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>

        <meta
          name="twitter:image"
          content={
            tagsData.profileImage
              ? `${apiDomain}/image/profile/${tagsData.profileImage}`
              : `${apiDomain}/websiteLogo/newlogo.jpg`
          }
        />
        <meta name="twitter:card" content="summary" />
        <link
          itemprop="thumbnailUrl"
          href={
            tagsData.profileImage
            ? `${apiDomain}/image/profile/${tagsData.profileImage}`
            : `${apiDomain}/websiteLogo/newlogo.jpg`
          }
        ></link>
        <span
          itemprop="thumbnail"
          itemscope
          itemtype={
            tagsData.profileImage && tagsData.profileImage
            ? `${apiDomain}/image/profile/${tagsData.profileImage}`
              : `${apiDomain}/websiteLogo/newlogo.jpg`
          }
        >
          <link
            itemprop="url"
            href={
              tagsData.profileImage && tagsData.profileImage
              ? `${apiDomain}/image/profile/${tagsData.profileImage}`
              : `${apiDomain}/websiteLogo/newlogo.jpg`
            }
          ></link>
        </span>
      </Head>
      <UserProfile data={data} />
    </div>
  );
};

UserProfilePage.getInitialProps = async ({ query }) => {
  const res = await fetch(
    `${apiDomain}/user/details/${query.name}`
  );
  const json = await res.json();

  let description = "";
  try {
    let string = [];
    let about = JSON.parse(json.userDetails[0].about).blocks;

    for (let i = 0; i < about.length; i++) {
      string.push(about[i].text);
    }
    description = string.toString();
  } catch {
    description = "About is not yet written";
  }
  return { data: json, description };
};
export default UserProfilePage;
