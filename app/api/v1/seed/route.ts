import { NextResponse } from "next/server"
import { getPayload } from "payload"

import configPromise from "@payload-config"

const initialUsers = [
	{
		email: "iam@email.com",
		password: "Testing123!",
		name: "IAM",
		role: "admin" as const
	},
	{
		email: "user1@example.com",
		password: "Password123!",
		name: "Regular User",
		role: "user" as const
	},
	{
		email: "user2@example.com",
		password: "Password123!",
		name: "Another User",
		role: "user" as const
	}
]

const initialCategories = [
	{ title: "Technology" },
	{ title: "Business" },
	{ title: "Health" },
	{ title: "Education" },
	{ title: "Entertainment" },
	{ title: "Sports" },
	{ title: "Science" },
	{ title: "Arts" }
]

const initialLinks = [
	{
		label: "web",
		url: "https://www.differentgrowth.com"
	}
]

const initialSocialMediaLinks = [
	{
		label: "instagram",
		url: "https://www.instagram.com/differentgrowthagency"
	}
]

export async function GET() {
	if (process.env.NODE_ENV === "production") {
		return NextResponse.json(
			{
				success: false,
				message:
					"Seeding is not allowed in production environment for security reasons."
			},
			{ status: 403 }
		)
	}

	try {
		const payload = await getPayload({ config: configPromise })

		console.log("Starting to seed categories...")
		const createdCategories = []

		for (const category of initialCategories) {
			const existingCategory = await payload.find({
				collection: "categories",
				where: {
					title: {
						equals: category.title
					}
				}
			})

			if (existingCategory.totalDocs === 0) {
				const newCategory = await payload.create({
					collection: "categories",
					data: category
				})

				createdCategories.push(newCategory)
				console.log(`Created category: ${category.title}`)
			} else {
				console.log(`Category ${category.title} already exists, skipping...`)
			}
		}

		console.log("Starting to seed users...")
		const createdUsers = []

		for (const user of initialUsers) {
			const existingUser = await payload.find({
				collection: "users",
				where: {
					email: {
						equals: user.email
					}
				}
			})

			if (existingUser.totalDocs === 0) {
				const newUser = await payload.create({
					collection: "users",
					data: {
						email: user.email,
						password: user.password,
						name: user.name,
						role: user.role
					}
				})

				const { password, ...userWithoutPassword } = newUser

				createdUsers.push(userWithoutPassword)
				console.log(`Created user: ${user.name} (${user.email})`)
			} else {
				console.log(`User ${user.email} already exists, skipping...`)
			}
		}

		console.log("Starting to seed links...")
		await payload.updateGlobal({
			slug: "links",
			data: {
				items: initialLinks
			}
		})

		console.log("Starting to seed social media links...")
		await payload.updateGlobal({
			slug: "social-media-links",
			data: {
				items: initialSocialMediaLinks
			}
		})

		return NextResponse.json({
			success: true,
			message: "Database seeded successfully",
			categories: {
				created: createdCategories.length,
				data: createdCategories
			},
			users: {
				created: createdUsers.length,
				data: createdUsers
			},
			links: {
				created: initialLinks.length,
				data: initialLinks
			},
			initialSocialMediaLinks: {
				created: initialSocialMediaLinks.length,
				data: initialSocialMediaLinks
			}
		})
	} catch (error) {
		console.error("Error seeding categories:", error)

		return NextResponse.json(
			{
				success: false,
				message: "Failed to seed database",
				error: error instanceof Error ? error.message : "Unknown error"
			},
			{ status: 500 }
		)
	}
}
