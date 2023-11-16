# Practice Questions on Streams and RxJS:

**1. Explain what is meant by the stream abstraction. What is the relationship between streams and the observer pattern? What are streams useful for modeling, and when might you use them in Rich Web development?**

- **Stream Abstraction:** A stream is a sequence of ongoing events ordered in time. It is an abstraction that represents a flow of data, allowing you to model and process asynchronous events.
- **Relationship with Observer Pattern:** Streams are closely related to the Observer pattern. In the Observer pattern, an object (the subject) maintains a list of dependents (observers) that are notified of state changes. Streams, particularly in the context of reactive programming like RxJS, use the Observer pattern to handle asynchronous data and events. Observables (streams) emit values over time, and observers can subscribe to these emissions.
- **Usefulness in Rich Web Development:** Streams are valuable for modeling asynchronous events in rich web development. They provide a concise and powerful way to handle user interactions, asynchronous requests, real-time updates, and other event-driven scenarios. Reactive programming with streams simplifies complex asynchronous workflows and enhances code readability.

**2. Assume that you are building an interface to an API in your Rich Web App. Describe in detail how you could use the RxJS library to handle asynchronous network responses to API requests. In your opinion, what are the benefits of using a streams library for networking over, say, promises? And what do you think are the downsides?**

**Handling API Requests with RxJS:**
   1. Use RxJS's `ajax` function to make HTTP requests.
   2. Convert the observable response to a stream of data.
   3. Apply operators like `map`, `filter`, and `mergeMap` to process the data stream.
   4. Subscribe to the observable to trigger the actual network request.

 - **Benefits of Using Streams (RxJS) for Networking:**
   - *Declarative Style:* Streams allow you to express complex asynchronous operations in a more declarative and readable manner compared to chaining promises.
   - *Powerful Operators:* RxJS provides a rich set of operators for transforming, filtering, and combining streams, offering more flexibility than promise chains.
   - *Cancellation and Disposal:* Observables in RxJS can be easily canceled or disposed of, providing more control over ongoing operations.

- **Downsides:**
   - *Learning Curve:* RxJS introduces a learning curve, especially for developers new to reactive programming. Understanding and mastering operators might take time.
   - *Complexity:* For simple cases, using promises might be more straightforward. Introducing RxJS for basic scenarios could be an overkill.
   - *Bundle Size:* Including the entire RxJS application, impacting load times.

**3. Consider three asynchronous tasks, A, B, & C. What are the consequences of these functions sharing global state? What is a good practice to alleviate any problems associated with this?**


   - **Consequences of Sharing Global State:**
     - *Race Conditions:* Concurrent access to shared state can lead to race conditions where the outcome is dependent on the order of execution.
     - *Difficulty in Debugging:* Debugging becomes challenging when multiple asynchronous tasks modify the same global state.
     - *Unpredictable Behavior:* Shared state can result in unpredictable behavior, especially in scenarios involving asynchronous updates.

   - **Good Practice to Alleviate Problems:**
     - *Immutability:* Encourage the use of immutable data structures. Instead of modifying existing state, create and return a new state.
     - *Local State:* Limit the scope of state by keeping it local to the components or modules that need it. Avoid unnecessary global state.
     - *State Management Libraries:* Use state management libraries (e.g., Redux in React applications) that provide controlled access to global state, enforcing best practices.
     - *Asynchronous Patterns:* Embrace asynchronous patterns like promises or observables to handle state changes more predictably.

These practices help reduce the chances of unexpected behavior and make it easier to reason about the flow of asynchronous tasks.
