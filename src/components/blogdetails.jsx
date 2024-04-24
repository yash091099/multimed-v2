import React from "react";
import BlogImage from "../assets/backimag.jpeg";
import WhyChooseUs from "./WhyChooseUs";

const BlogDetails = () => {

    return (
        <>
                <div className="w-100 h-[1260px] px-[100px] py-12 bg-white flex-col justify-start items-start gap-5 inline-flex">
        {/* <div><span >Link 1/Link2/</span><span >Blog page</span></div> */}
        <div className="self-stretch justify-between items-center inline-flex">
          <div className="text-slate-900 text-[32px] font-bold font-['Helvetica Neue'] leading-10">
            Blog title
          </div>
          <div className="self-stretch justify-start items-center gap-2 flex">
            <img
              className="w-10 h-10 relative rounded-[64px]"
              src={BlogImage}
            />
            <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
              <div className="self-stretch text-slate-900 text-sm font-medium font-['Helvetica Neue'] leading-[17.50px]">
                Dr. Sakshi L
              </div>
              <div className="self-stretch text-slate-900 text-xs font-light font-['Helvetica Neue'] leading-[15px]">
                MD. Pharmacology
              </div>
            </div>
          </div>
        </div>
        <img className="w-full h-[344px] relative rounded-lg"  src={BlogImage} />
        <div className="self-stretch h-[702px] flex-col justify-start items-start gap-2 flex">
          <div className="text-slate-900 text-base font-medium font-['Helvetica Neue'] leading-tight">
            Featured Blog title goes here
          </div>
          <div className="self-stretch text-slate-900 text-sm font-normal font-['Helvetica Neue'] leading-[17.50px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
            odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
            quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent
            mauris. Fusce nec tellus sed augue semper porta. Mauris massa.
            Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad
            litora torquent per conubia nostra, per inceptos himenaeos.
            Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.{" "}
            <br />
            <br />
            Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem
            at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut
            ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel,
            suscipit quis, luctus non, massa. Fusce ac turpis quis ligula
            lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel,
            tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit.{" "}
            <br />
            <br />
            Class aptent taciti sociosqu ad litora torquent per conubia nostra,
            per inceptos himenaeos. Nam nec ante. Sed lacinia, urna non
            tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante
            quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc
            feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin
            quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit.{" "}
            <br />
            <br />
            Sed lectus. Integer euismod lacus luctus magna. Quisque cursus,
            metus vitae pharetra auctor, sem massa mattis sem, at interdum magna
            augue eget diam. Vestibulum ante ipsum primis in faucibus orci
            luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie
            dui. Praesent blandit dolor. Sed non quam. In vel mi sit amet augue
            congue elementum. Morbi in ipsum sit amet pede facilisis laoreet.
            Donec lacus nunc, viverra nec, blandit vel, egestas et, augue.
            Vestibulum tincidunt malesuada tellus. Ut ultrices ultrices enim.
            Curabitur sit amet mauris. <br />
            <br />
            Morbi in dui quis est pulvinar ullamcorper. Nulla facilisi. Integer
            lacinia sollicitudin massa. Cras metus. Sed aliquet risus a tortor.
            Integer id quam. Morbi mi. Quisque nisl felis, venenatis tristique,
            dignissim in, ultrices sit amet, augue. Proin sodales libero eget
            ante. Nulla quam. Aenean laoreet. Vestibulum nisi lectus, commodo
            ac, facilisis ac, ultricies eu, pede. Ut orci risus, accumsan
            porttitor, cursus quis, aliquet eget, justo. Sed pretium blandit
            orci. <br />
            <br />
          </div>
          <div className="self-stretch text-slate-900 text-sm font-normal font-['Helvetica Neue'] leading-[17.50px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
            odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
            quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent
            mauris. Fusce nec tellus sed augue semper porta. Mauris massa.
            Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad
            litora torquent per conubia nostra, per inceptos himenaeos.
            Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.{" "}
            <br />
            <br />
            Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem
            at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut
            ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel,
            suscipit quis, luctus non, massa. Fusce ac turpis quis ligula
            lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel,
            tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit.{" "}
            <br />
            <br />
            Class aptent taciti sociosqu ad litora torquent per conubia nostra,
            per inceptos himenaeos. Nam nec ante. Sed lacinia, urna non
            tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante
            quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc
            feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin
            quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit.{" "}
            <br />
            <br />
            Sed lectus. Integer euismod lacus luctus magna. Quisque cursus,
            metus vitae pharetra auctor, sem massa mattis sem, at interdum magna
            augue eget diam. Vestibulum ante ipsum primis in faucibus orci
            luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie
            dui. Praesent blandit dolor. Sed non quam. In vel mi sit amet augue
            congue elementum. Morbi in ipsum sit amet pede facilisis laoreet.
            Donec lacus nunc, viverra nec, blandit vel, egestas et, augue.
            Vestibulum tincidunt malesuada tellus. Ut ultrices ultrices enim.
            Curabitur sit amet mauris. <br />
            <br />
            Morbi in dui quis est pulvinar ullamcorper. Nulla facilisi. Integer
            lacinia sollicitudin massa. Cras metus. Sed aliquet risus a tortor.
            Integer id quam. Morbi mi. Quisque nisl felis, venenatis tristique,
            dignissim in, ultrices sit amet, augue. Proin sodales libero eget
            ante. Nulla quam. Aenean laoreet. Vestibulum nisi lectus, commodo
            ac, facilisis ac, ultricies eu, pede. Ut orci risus, accumsan
            porttitor, cursus quis, aliquet eget, justo. Sed pretium blandit
            orci. <br />
            <br />
          </div>
        </div>
      </div>

      <WhyChooseUs />
    </>
  );
};

export default BlogDetails;
