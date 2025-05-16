"use client"

import { BellRingingIcon, CheckIcon } from "@phosphor-icons/react/dist/ssr"
import { toast } from "sonner"

import { ModeToggle } from "@/components/mode-toggle"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

export default function Page() {
	return (
		<main className="prose prose-stone dark:prose-invert max-w-none">
			<div className="container sticky inset-0 top-0 flex max-w-none justify-end pt-6">
				<ModeToggle />
			</div>

			<section className="container mt-12">
				<h1>Different Growth Template [h1]</h1>
				<h2>Different Growth Template [h2]</h2>
				<h3>Different Growth Template [h3]</h3>
				<h4>Different Growth Template [h4]</h4>
				<h5>Different Growth Template [h5]</h5>
				<h6>Different Growth Template [h6]</h6>

				<p>Different Growth Template [p]</p>
				<span>Different Growth Template [span]</span>
				<blockquote>Different Growth Template [blockquote]</blockquote>

				<div className="flex flex-col space-y-6">
					<div className="flex flex-col space-y-2">
						<p>Badges</p>
						<div className="flex flex-wrap gap-2">
							<Badge>default</Badge>
							<Badge variant="secondary">secondary</Badge>
							<Badge variant="destructive">destructive</Badge>
							<Badge variant="success">success</Badge>
							<Badge variant="warning">warning</Badge>
							<Badge variant="info">info</Badge>
							<Badge variant="outline">outline</Badge>
						</div>
					</div>
					<div className="flex flex-col space-y-2">
						<p>Buttons</p>
						<div className="flex flex-wrap gap-2">
							<Button>default</Button>
							<Button variant="secondary">secondary</Button>
							<Button variant="ghost">ghost</Button>
							<Button variant="success">success</Button>
							<Button variant="destructive">destructive</Button>
							<Button variant="warning">warning</Button>
							<Button variant="info">info</Button>
							<Button variant="outline">outline</Button>
							<Button variant="link">link</Button>
							<Button variant="linkHover1">link hover 1</Button>
							<Button variant="linkHover2">link hover 2</Button>
						</div>
					</div>
					<div className="flex flex-col space-y-2">
						<p>Toasts (notifications, click buttons to watch them)</p>
						<div className="flex flex-wrap gap-2">
							<Button
								variant="default"
								onClick={() => toast("Default Toast", { description: "default" })}
							>
								default
							</Button>
							<Button
								variant="success"
								onClick={() =>
									toast.success("Success Toast", { description: "success" })
								}
							>
								success
							</Button>
							<Button
								variant="destructive"
								onClick={() =>
									toast.error("Error Toast", { description: "destructive" })
								}
							>
								destructive
							</Button>
							<Button
								variant="warning"
								onClick={() =>
									toast.warning("Warning Toast", { description: "warning" })
								}
							>
								warning
							</Button>
							<Button
								variant="info"
								onClick={() => toast.info("Info Toast", { description: "info" })}
							>
								info
							</Button>
						</div>
					</div>
					<div className="flex flex-col space-y-2">
						<p>Cards</p>
						<div className="flex flex-wrap gap-2">
							<Card className="aspect-square w-full max-w-xs">
								<CardHeader>
									<CardTitle>Card Title</CardTitle>
									<CardDescription>Card Description</CardDescription>
								</CardHeader>
								<CardContent>
									<p>Card Content</p>
								</CardContent>
								<CardFooter>
									<p>Card Footer</p>
								</CardFooter>
							</Card>
							<Card className="w-[380px] max-w-full">
								<CardHeader>
									<CardTitle>Notifications</CardTitle>
									<CardDescription>You have 3 unread messages.</CardDescription>
								</CardHeader>
								<CardContent className="grid gap-4">
									<div className=" flex items-center space-x-4 rounded-md border p-4">
										<BellRingingIcon />
										<div className="flex-1 space-y-1">
											<p className="font-medium text-sm leading-none">
												Push Notifications
											</p>
											<p className="text-muted-foreground text-sm">
												Send notifications to device.
											</p>
										</div>
										<Switch />
									</div>
									<div>
										{[
											{
												title: "Your call has been confirmed.",
												description: "1 hour ago"
											},
											{
												title: "You have a new message!",
												description: "1 hour ago"
											},
											{
												title: "Your subscription is expiring soon!",
												description: "2 hours ago"
											}
										].map((notification, index) => (
											<div
												// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
												key={index}
												className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
											>
												<span className="flex h-2 w-2 translate-y-1 rounded-full bg-info" />
												<div className="space-y-1">
													<p className="font-medium text-sm leading-none">
														{notification.title}
													</p>
													<p className="text-muted-foreground text-sm">
														{notification.description}
													</p>
												</div>
											</div>
										))}
									</div>
								</CardContent>
								<CardFooter>
									<Button className="w-full">
										<CheckIcon /> Mark all as read
									</Button>
								</CardFooter>
							</Card>
						</div>
					</div>
				</div>

				<div className="mt-12 flex flex-col space-y-2">
					<strong>Different Growth Template [strong]</strong>
					<em>Different Growth Template [em]</em>
					<code>Different Growth Template [code]</code>
					<pre>Different Growth Template [pre]</pre>
					<mark>Different Growth Template [mark]</mark>
					<small>Different Growth Template [small]</small>
					<sub>Different Growth Template [sub]</sub>
					<sup>Different Growth Template [sup]</sup>
				</div>

				{/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
				<a href="#">Different Growth Template [a]</a>

				<ul>
					<li>Different Growth Template [li in ul]</li>
				</ul>
				<ol>
					<li>Different Growth Template [li in ol]</li>
				</ol>
				<dl>
					<dt>Different Growth Template [dt]</dt>
					<dd>Different Growth Template [dd]</dd>
				</dl>

				<div className="my-6 w-full overflow-y-auto">
					<table className="w-full">
						<thead>
							<tr>
								<th>{"King's Treasury"}</th>
								<th>{"People's happiness"}</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Empty</td>
								<td>Overflowing</td>
							</tr>
							<tr>
								<td>Modest</td>
								<td>Satisfied</td>
							</tr>
							<tr>
								<td>Full</td>
								<td>Ecstatic</td>
							</tr>
						</tbody>
					</table>
				</div>
			</section>
		</main>
	)
}
