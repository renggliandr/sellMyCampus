import LoginRegistration from "../components/LoginRegistration";
import UsersAPI from "../lib/api/Users";

export default function loginPage(users, highestId) {

    return (
        <div>
                <LoginRegistration type={"login"} users={users} highestId = {highestId}/>
        </div>
    )
}

export async function getStaticProps(){
    let users;
    const highestId = await UsersAPI.getHighestId();
    try{
        users = await UsersAPI.readAll();

    } catch (e){
        users = null;
    }
    return{
        props: { users, highestId }, revalidate: 30
    }
}